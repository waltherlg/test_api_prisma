import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser() {
    const userDto = {
      login: 'bob',
      email: 'bob1@bobwell.tre',
    };
    const result = await this.userRepository.createUser(userDto);
    return result;
  }
}
