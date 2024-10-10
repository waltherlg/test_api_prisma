import { Module } from '@nestjs/common';
import { AppController } from './test.controller';
import { AppService } from './app.service';
import { UserRepository } from './User/user.repository';
import { UserService } from './User/user.service';
import { PrismaService } from './prisma.service';
import { UserController } from './User/user.controller';

@Module({
	imports: [],

	controllers: [AppController, UserController],
	providers: [PrismaService, AppService, UserRepository, UserService],
})
export class AppModule {}
