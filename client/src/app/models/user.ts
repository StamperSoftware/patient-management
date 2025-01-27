import { Roles } from "./roles";

export type User = {
    firstName:string
    lastName:string
    email:string
    password:string
    roles:Roles
}