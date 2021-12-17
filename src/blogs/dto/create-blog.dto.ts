import { IsNotEmpty } from "class-validator";

export class CreateBlogDto {

    @IsNotEmpty()
    blogName: string;

    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    userId: string;

}