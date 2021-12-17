import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositoris/user.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersRepository]),
    forwardRef(() =>  AuthModule ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
