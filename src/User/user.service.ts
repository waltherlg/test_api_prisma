import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, Prisma, Profile } from '@prisma/client';
import {
	CreateProfileDomainDto,
	CreateUserDto,
	DomainProfile,
	DomainUser,
} from './user.dto';

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
		const result = await this.userRepository.createUser(userDto);
		return result;
	}

	async createUser(data: CreateUserDto) {
		const { login, email } = data;
		const userDto = {
			login,
			email,
		};
		const bio = 'started set';
		const result = await this.userRepository.createUser(userDto);
		return result;
	}

	async createProfile(profileBody: CreateProfileDomainDto) {
		const user = await this.userRepository.getUserAsEntityById(
			profileBody.userId,
		);
		if (!user) {
			const userData: CreateUserDto = {
				login: profileBody.providerName,
				email: profileBody.providerEmail,
			};
			const newUser: DomainUser =
				await this.userRepository.createUser(userData);
			console.log('юзер сделан из профайла', newUser);

			profileBody.userId = newUser.userId;
			const result = await this.userRepository.createProfile(profileBody);
			return result;
		}
		console.log(user);
		return user;
	}
}
