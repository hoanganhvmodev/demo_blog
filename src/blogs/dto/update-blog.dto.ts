import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateBlogDto {

    @IsNotEmpty()
    @IsOptional()
    blogName: string;

    @IsNotEmpty()
    @IsOptional()
    comments: string;
}