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
      private blogsRepository: Repository<BlogsRepository>,
      private readonly authService: AuthService 
    ){}

    // async createBlog(
    //     body: CreateBlogDto,
    //     ): Promise<Blog> {
    //     const blog = new BlogEntity();
    //     blog.blogName = body.blogName;
    //     blog.comments = body.comments
    //     return await this.blogsRepository.create(blog);
    //   }  
    //   async updateBlog(
    //     id: string,
    //     data: UpdateBlogDto,
    //   ): Promise<any> {
    //     const blog = new UpdateBlogDto();
    //     blog.blogName = data.blogName;
    //     blog.comments = data.comments;
    //     return await this.blogsRepository.updateUSer(id, blog)
    //   }

      async deleteBlog(id: string):Promise<any> {
        const blog = await this.blogsRepository.delete(id);
        return{
          message: 'Deleted Success',
          blog
        }
      }
}
