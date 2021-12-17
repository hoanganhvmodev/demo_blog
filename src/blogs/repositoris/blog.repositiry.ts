import { EntityRepository, Repository } from "typeorm";
import { BlogEntity } from "../entitys/blog.entity";

@EntityRepository(BlogEntity)
export class BlogsRepository extends Repository<BlogEntity> {
}