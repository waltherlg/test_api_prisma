import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './User/user.service';
import { UserRepository } from './User/user.repository';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly userService: UserService,
		private readonly userRepository: UserRepository,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post('test/create_and_get_user')
	async create_and_get_user() {
		return await this.userService.createUser();
	}

	@Delete('test/user/:userId')
	async deleteUser(@Param('userId') userId) {
		return await this.userRepository.deleteUserById(userId);
	}

	@Get('test/user/:userId')
	async getUserWithProfile(@Param('userId') userId) {
		return await this.userRepository.getUserWithProfile(userId);
	}
}
