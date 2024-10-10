import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
	@ApiProperty({ example: 1 })
	userId: number;

	@ApiProperty({ example: 'john_doe' })
	login: string;

	@ApiProperty({ example: 'some@mailr.hf' })
	email: string;
}

export class CreateUserDto {
	@ApiProperty({ example: 1 })
	userId: number;

	@ApiProperty({ example: 'john_doe' })
	login: string;

	@ApiProperty({ example: 'some@mailr.hf' })
	email: string;
}
