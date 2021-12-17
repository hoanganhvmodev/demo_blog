import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogsController {
    constructor(private blogService:BlogsService){}

    // @Post('/create')
    // async createBlog(
    //     @Body() body: CreateBlogDto,
    // ): Promise<any> {
    //     return await this.blogService.createBlog(body);
    // }

    // @Post('/update/:id')
    // async updateBlog(
    //     @Param() id: string,
    //     @Body() body: UpdateBlogDto,
    // ): Promise<any> {
    //     return await this.blogService.updateBlog(id, body);
    // }

    @Delete('/delete/:id')
    async deleteBlog(
        @Param()id: string,
    ):Promise<any>{
        return await this.blogService.deleteBlog(id);
    }
}
