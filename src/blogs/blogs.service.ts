import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entitys/blog.entity';
import { Blog } from './entitys/blog.interface';
import { BlogsRepository } from './repositoris/blog.repositiry';

@Injectable()
export class BlogsService {
    constructor(
      @InjectRepository(BlogsRepository)
      private readonly blogsRepository: BlogsRepository,
      private readonly authService: AuthService 
    ){}

    async createBlog(
      body: CreateBlogDto,
    ): Promise<BlogEntity> {
      return await this.blogsRepository.save(body);
    }  

      async updateBlog(
        id: string,
        data: UpdateBlogDto,
      ): Promise<any> {
        const blog = new UpdateBlogDto();
        blog.comments = data.comments;
        const Data = await this.blogsRepository.update(id, blog)
        return{
          message: "Updated Success",
          blog: Data,
        }
      }

      async deleteBlog(id: string):Promise<any> {
        const blog = await this.blogsRepository.delete(id);
        return{
          message: 'Deleted Success',
          blog
        }
      }
}
