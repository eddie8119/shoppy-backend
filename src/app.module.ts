import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // dynamic providers
    LoggerModule.forRootAsync({ // forRootAsync根據應用程式的運行環境設置日誌系統的配置
      imports: [ConfigModule], //讀取環境變數和設定
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'Production'; //NODE_ENV 在開發過程 不會被設定

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  // 美化
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProduction ? 'info' : 'debug',
            //info：記錄較少的日誌，專注於關鍵訊息。
            //debug：詳細記錄調試訊息。
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
