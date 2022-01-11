import { IsNotEmpty } from "class-validator";

export class  CreateBlogDto {

    @IsNotEmpty()
    blogName: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    images: string;

    @IsNotEmpty()
    userId: string;

}