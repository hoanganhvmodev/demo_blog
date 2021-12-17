import { BlogEntity } from 'src/blogs/entitys/blog.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum UserRole{
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user'
}
@Entity({ name: 'users' })
export class UserEntity  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userName: string;

    @Column()
    passWord: string;

    @Column()
    email: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @OneToMany(() => BlogEntity, blog => blog.user)
    blogs: BlogEntity[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}