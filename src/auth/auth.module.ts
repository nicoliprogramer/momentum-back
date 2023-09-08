import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
export const jwtSecret = 'aosdljkashdlas';

@Module({
  imports: [PrismaModule,
            PassportModule,
            JwtModule.register({
                secret: jwtSecret,
                signOptions: {expiresIn: '5m'},
            }),
          UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
