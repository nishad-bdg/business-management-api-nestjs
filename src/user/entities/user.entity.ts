import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id?: number;

  @Field()
  fullname: string;

  @Field()
  email?: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
