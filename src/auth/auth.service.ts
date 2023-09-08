import { Injectable, NotFoundException, BadRequestException, ConflictException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
                private jwtService: JwtService) {}


    async loginUser(user: LoginDto) {
        try{
        const userData = await this.prisma.user.findUnique({
        where: {email: user.email}
        })
        if (!userData) {
        throw new NotFoundException(`No user found for email: ${user.email}`);
        }

        const isMatch = await bcrypt.compare(user.password , userData.password)
        if(!isMatch){
            throw new BadRequestException("User not found");
            }
        const token = this.jwtService.sign({ userId: userData.id })
        return {
        token
        }
        }
        catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P1013') throw new ConflictException('User not found') 
        throw error;
        }
    }
}
