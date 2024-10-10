import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './User/user.service';
import { UserRepository } from './User/user.repository';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from './User/user.dto';

@ApiTags('Test') // Категория API в Swagger
@Controller('test')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly userService: UserService,
		private readonly userRepository: UserRepository,
	) {}

	@ApiOperation({
		summary: 'get Hello world!',
	})
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@ApiOperation({
		summary: 'POST создаст рандомного юзера с профилем',
	})
	@ApiResponse({
		status: 201,
		description: 'возват созданного пользователя',
		type: CreateUserResponseDto,
	})
	@Post('create_and_get_user')
	async create_and_get_user() {
		return await this.userService.createRandomUser();
	}
}
