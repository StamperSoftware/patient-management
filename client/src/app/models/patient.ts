import { Recommendation } from "./recommendation";

export type Patient = {
    firstName:string
    lastName:string
    id?:number
    recommendations:Recommendation[]
}