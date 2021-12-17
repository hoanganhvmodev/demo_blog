import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/repositoris/user.repository';

@Injectable()
export class AuthService {
    private saltOrRounds = 10;
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
      ) {}
    async createUser(
        createUser: Record<string, any>,
      ): Promise<any> {
        const hashedPassWord = await bcrypt.hash(createUser.passWord, this.saltOrRounds);
        const user = { ...createUser, passWord: hashedPassWord};

        const data =  await this.usersRepository.save(user);
        return{
          message:"Create Success",
          User: data
      }
    }

    async updateUSer(
      id: string,
      data: Record<string, any>
    ):Promise<any>{
      const hashedPassWord = await bcrypt.hash(data.passWord, this.saltOrRounds);
      const user = { ...data, passWord: hashedPassWord};
      await this.usersRepository.update(id, user)
      return {
        message: 'User Updated',
        USer: data
      };
    }
    async findUser(
      user: Record<string, any>,
      res: any,
    ): Promise<any> {
      const User =  await this.usersRepository.findOne({userName: user.userName});
      if(!User){
        throw new BadRequestException('invalid credentials');
      }

      if(!await bcrypt.compare(user.passWord, User.passWord)) {
        throw new BadRequestException('invalid credentials');
      }

      const token = await this.jwtService.signAsync({...User});
      res.cookie('token', token, {httpOnly: true})
      return{
        message:"Login User Success",
        Token: token
      }
    }

    async getUser(res:any):Promise<any>{
      try{
        const cookie = res.cookies['token'];
        const data = await this.jwtService.verifyAsync(cookie);

        if(!data){
          throw new UnauthorizedException;
        }

        const user = await this.usersRepository.findOne({id: data.id})

        const {passWord, ...result} = user
        return result;
      }catch(err){
        console.log(err);
        throw new UnauthorizedException
      }
    }

    async logOutUser(res:any):Promise<any>{
      try{
        res.clearCookie('token');
       
        return {
          message: 'Cleared cookie'
        };
      }catch(err){
        console.log(err);
        throw new UnauthorizedException
      }
    }

}
