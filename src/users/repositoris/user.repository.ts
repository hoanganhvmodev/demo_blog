import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entitys/user.entity";

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
}