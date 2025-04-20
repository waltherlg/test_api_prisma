import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import {
	Prisma,
	User as PrismaUser,
	Profile as PrismaProfile,
} from '@prisma/client';

export class CreateUserResponseDto {
	@ApiProperty({ example: 1 })
	userId: number;

	@ApiProperty({ example: 'john_doe' })
	login: string;

	@ApiProperty({ example: 'some@mailr.hf' })
	email: string;
}

export class CreateUserDto {
	@ApiProperty({ example: 'john_doe' })
	login: string;
	@ApiProperty({ example: 'some@mailr.hf' })
	email: string;
}

export const ZodUserSchema = z
	.object({
		userId: z.number(),
		login: z.string(),
		email: z.string().email('Invalid email format'),
	})
	.required()
	.strict();

type rte = (typeof ZodUserSchema)['_output'];

export const createUsersShema = ZodUserSchema.omit({ userId: true }).merge(
	ZodUserSchema.pick({ login: true, email: true }).required().partial(),
);

export type CreateUserInf = z.infer<typeof createUsersShema>;

export const schemesApi = {
	user: {
		create: createUsersShema,
	},
	profile: {},
};

@Injectable()
export class DomainUser {
	userId: number;
	login: string;
	email: string;
	profiles?: DomainProfile[];

	static createNewInstance(dto: CreateUserDomainDto): DomainUser {
		const user = new this();
		user.login = dto.login;
		user.email = dto.email;
		return user;
	}

	static createFromData(raw: PrismaUser): DomainUser {
		return Object.assign(new this(), raw);
	}

	compareFieldsTo(existingUser: DomainUser): Prisma.UserUpdateInput {
		const data: Prisma.UserUpdateInput = {};
		Object.keys(this).forEach((key: string) => {
			if (existingUser[key] !== this[key]) {
				data[key] = this[key];
			}
		});
		return data;
	}

	createProfile(profileDto: CreateProfileDomainDto): DomainProfile {
		const profile = DomainProfile.createNewInstance(profileDto);

		if (!this.profiles) {
			this.profiles = [];
		}
		this.profiles.push(profile);

		return profile;
	}
}

export interface CreateUserDomainDto {
	login: string;
	email: string;
}

export class CreateProfileDomainDto {
	bio: string;
	userId: number;
	providerName: string;
	providerEmail: string;
}

export class DomainProfile {
	profileId: number;
	providerName: string;
	providerEmail: string;
	bio: string;
	userId: number;

	static createNewInstance(dto: CreateProfileDomainDto): DomainProfile {
		const profile = new this();
		dto.providerName;
		dto.providerEmail;
		dto.bio;
		profile.userId = dto.userId;

		return profile;
	}

	static createFromData(raw: PrismaProfile): DomainProfile {
		return Object.assign(new this(), raw);
	}
}
