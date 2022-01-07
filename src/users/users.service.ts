import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entitys/user.entity';
import { UsersRepository } from './repositoris/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: Repository<UsersRepository>,
     private readonly authService: AuthService 
     ){}

    async createUser(
      body: CreateUserDto,
      ): Promise<UserEntity> {
      const user = new UserEntity();
      user.userName = body.userName;
      user.passWord = body.passWord;
      user.email = body.email;
      user.role = body.role;
      return this.authService.createUser(user);
    }

    async updateUser(
      id: string,
      data: UpdateUserDto,
    ): Promise<any> {
      const user = new UpdateUserDto();
      user.userName = data.userName;
      user.passWord = data.passWord;
      user.email = data.email;
      user.role = data.role;
      return await this.authService.updateUSer(id, user)
    }
    async findUser(
      body: FindUserDto,
      res: any,
      ): Promise<UserEntity> {
      const user = new FindUserDto();
      user.userName = body.userName;
      user.passWord = body.passWord;
      return this.authService.findUser(user, res);
    }

    async getUser(
    req: any,
    ): Promise<any> {
    return this.authService.getUser(req);
    }

    async logOutUser(
    res: any,
    ): Promise<any> {
    return this.authService.logOutUser(res);
    }

    async deleteUSer(id: string):Promise<any> {
      const user = await this.usersRepository.delete(id);
      return{
        message: 'Deleted Success',
        user
      }
    }
}
