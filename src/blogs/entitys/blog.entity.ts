import { UserEntity } from 'src/users/entitys/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'blogs' })
export class BlogEntity  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    blogName: string;

    @Column()
    title: string;

    
    @Column()
    content: string;

    @Column()
    comments: string;

    @Column()
    images: string;

    @ManyToOne(() => UserEntity, user => user.blogs)
    user: UserEntity


    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}