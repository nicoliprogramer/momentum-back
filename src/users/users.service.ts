import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken'
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

   async createUser(user: RegisterUserDto) {
    try {
      const createData = await this.prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password
      }
    });
      const token = await jwt.sign({id: createData.id, username: createData.username}, process.env.TOKEN_SECRET)
      const id = createData.id
    return{
      id,
      token
    }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError &&
         error.code === 'P2002') throw new ConflictException('Username already register') 
      throw error;
    }
  }

   async findOne(id: number) {
    const dataUser = await this.prisma.user.findUnique({
      where: {id}
    })
    return {
      statusCode: 200,
      data: dataUser
    }

  }
}
