import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
      @Inject(forwardRef(() => UsersService))
      private userService: UsersService
      ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('Roles', context.getHandler());
        if(!roles){
            return true;
        }
       
        const { user } = context.switchToHttp().getRequest();
        return roles.some((role) => user.roles?.includes(role));
     }
}