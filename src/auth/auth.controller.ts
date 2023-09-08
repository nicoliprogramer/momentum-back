import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @ApiOkResponse({type: AuthEntity})
    login(@Body() body: LoginDto){
    const user = this.authService.loginUser(body);
    return user
    }
}
