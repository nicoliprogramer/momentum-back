import { Controller, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';


const saltOrRounds = 10;

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Post('register')
    async registerUser(@Body() user: RegisterUserDto) {
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    return  await this.usersService.createUser({... user, password: hash});
  }
}
