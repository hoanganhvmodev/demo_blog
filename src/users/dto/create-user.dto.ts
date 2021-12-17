import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "../entitys/user.entity";

export class CreateUserDto {

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    passWord: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEmail()
    role?: UserRole;
}