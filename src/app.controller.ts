import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './User/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test/create_and_get_user')
  async create_and_get_user(){
    return await this.userService.createUser()        
  }

}
