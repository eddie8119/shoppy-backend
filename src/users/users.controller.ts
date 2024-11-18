import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  // @Body() 自動將 HTTP 請求體解析成 JSON 並映射到 request 參數
  // request 是 @Body() 裝飾器所解析並注入的參數。它包含了客戶端發送的 HTTP 請求體的資料。
  // request 是 CreateUserRequest 類型的實例
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
