import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}
	// Создание пользователя
	async createUser(userData: CreateUserDto, bio: string): Promise<User> {
		await this.prisma.user.deleteMany({});
		await this.prisma.profile.deleteMany({});
		const user = await this.prisma.user.create({
			data: {
				login: userData.login,
				email: userData.email,
			},
		});
		const profile = await this.prisma.profile.create({
			data: {
				userId: user.userId,
				bio: bio,
			},
		});
		return user;
	}

	// Поиск пользователя по email
	async findUserByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	// Получение всех пользователей
	async findAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserWithProfile(Id) {
		const userId = +Id;
		const user = await this.prisma.user.findUnique({
			where: { userId },
			include: {
				Profile: {
					select: {
						bio: true, // Указываем конкретное поле, которое нужно вернуть
					},
				},
			},
		});
		console.log(user);

		return user;
	}

	async deleteUserById(userId) {
		const result = await this.prisma.user.deleteMany({
			where: { userId: +userId },
		});
		console.log(result);

		return result.count > 0;
	}
}
