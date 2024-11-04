import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

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
		login: z.string().min(3, 'Login must be at least 3 characters long'),
		email: z.string().email('Invalid email format'),
	})
	.strict();

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
