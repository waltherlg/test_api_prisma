import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createRandomUser() {
		const userDto = {
			login: 'bob',
			email: 'bob1@bobwell.tre',
		};
		const profileDto = {};
		const result = await this.userRepository.createUser(userDto);
		return result;
	}

	async createUser(data: CreateUserDto) {
		const { login, email } = data;
		const userDto = {
			login,
			email,
		};
		const result = await this.userRepository.createUser(userDto);
		return result;
	}
}
