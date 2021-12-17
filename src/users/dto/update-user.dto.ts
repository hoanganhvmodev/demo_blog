import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsOptional()
    userName: string;

    @IsNotEmpty()
    @IsOptional()
    passWord: string;

    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsOptional()
    role?: string;
}