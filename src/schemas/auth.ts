import {object, string} from "zod";



export const signInSchema = object({
    email:string({required_error: "Email is required"})
    .email("Invalid email address")
    .min(8, "Email must be at least 8 characters long"),


    password:string({required_error:"Password is required"})
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),

})