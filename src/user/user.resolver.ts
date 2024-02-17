import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginResponse, RegisterResponse } from 'src/auth/types';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { Response } from 'express';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth/graphql-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Query(() => [User], { name: 'user' })
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => String)
  async demo() {
    return this.authService.demo();
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password are not the same.',
      });
    }
    try {
      const { user } = await this.authService.register(
        registerDto,
        context.res,
      );
      console.log('user!', user);
      return { user };
    } catch (error) {
      // Handle the error, for instance if it's a validation error or some other type
      return {
        error: {
          message: error.message,
          // code: 'SOME_ERROR_CODE' // If you have error codes
        },
      };
    }
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }
}
