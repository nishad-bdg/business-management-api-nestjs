import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    ConfigService,
    AuthService,
  ],
})
export class UserModule {}
