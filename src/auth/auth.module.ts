import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositoris/user.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersRepository]),
    forwardRef(() =>  UsersModule ),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '3600s' }
    })
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
