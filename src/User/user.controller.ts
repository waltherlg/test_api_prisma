import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRepository } from './user.repository';
import { CreateUserDto, CreateUserResponseDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User') // Категория API в Swagger
@Controller('user')
export class UserController {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userServise: UserService,
	) {}

	@ApiOperation({
		summary: 'удаляет пользователя по userId',
	})
	@ApiParam({
		name: 'userId',
		required: true,
		description: 'ID пользователя для запроса',
		example: '123',
	})
	@ApiResponse({
		status: 204,
		description: 'пользователь удален',
	})
	@ApiResponse({
		status: 404,
		description: 'пользователь не найден',
	})
	@HttpCode(204)
	@Delete(':userId')
	async deleteUser(@Param('userId') userId) {
		const result = await this.userRepository.deleteUserById(userId);
		if (!result) throw new NotFoundException('user');
	}

	@ApiOperation({
		summary: 'Запрос пользователя по айди',
	})
	@ApiParam({
		name: 'userId',
		required: true,
		description: 'ID пользователя для запроса',
		example: '123',
	})
	@ApiResponse({
		status: 201,
		description: 'возват пользователя',
		type: CreateUserResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: 'пользователь не найден',
	})
	@Get(':userId')
	async getUserWithProfile(@Param('userId') userId) {
		const result = await this.userRepository.getUserWithProfile(userId);
		if (!result) throw new NotFoundException('user');
		return result;
	}

	@ApiOperation({
		summary: 'Создание пользователя',
	})
	@ApiResponse({
		status: 201,
		description: 'возват пользователя',
		type: CreateUserResponseDto,
	})
	@Post()
	async createUser(@Body() body: CreateUserDto) {
		const result = await this.userServise.createUser(body);
		return result;
	}
}
