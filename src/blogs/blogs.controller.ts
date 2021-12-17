import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { JwtStrategy } from 'src/auth/guards/jwt-strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/entitys/user.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogsController {
    constructor(private blogService:BlogsService){}

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('/create')
    async createBlog(
        @Body() body: CreateBlogDto,
    ): Promise<any> {
        return await this.blogService.createBlog(body);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.USER, UserRole.MANAGER, UserRole.ADMIN)
    @Put('/update/:id')
    async updateBlog(
        @Param() id: string,
        @Body() body: UpdateBlogDto,
    ): Promise<any> {
        return await this.blogService.updateBlog(id, body);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete('/delete/:id')
    async deleteBlog(
        @Param()id: string,
    ):Promise<any>{
        return await this.blogService.deleteBlog(id);
    }
}
