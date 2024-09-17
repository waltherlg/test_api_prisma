import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './User/user.repository';
import { UserService } from './User/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    UserRepository,
    UserService],
})
export class AppModule {}
