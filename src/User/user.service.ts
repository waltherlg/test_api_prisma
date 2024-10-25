import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, Prisma, Profile } from '@prisma/client';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createRandomUser() {
		const userDto: Omit<User, 'userId'> = {
			login: 'bob',
			email: 'bob1@bobwell.tre',
		};
		const profileDto: Pick<Profile, 'bio'> = {
			bio: 'some random text',
		};
		const result = await this.userRepository.createUser(
			userDto,
			profileDto.bio,
		);
		return result;
	}

	async createUser(data: CreateUserDto) {
		const { login, email } = data;
		const userDto = {
			login,
			email,
		};
		const bio = 'started set';
		const result = await this.userRepository.createUser(userDto, bio);
		return result;
	}
}
