import { UserRole } from "./user.entity";

export interface User{
    id?: string;
    userName?: string;
    passWord?: string;
    email?: string;
    role?: UserRole;
}