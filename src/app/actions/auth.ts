"use server"

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signInSchema } from "~/schemas/auth"
import { db } from "~/server/db";


export async function signup(email:string,password:string){


    //validation

    const isValid=signInSchema.safeParse({ email, password });
    if (isValid.error) {
        return { error: "Invalid input" };
    }

    //see  if user exists
    const user=await db.user.findUnique({
        where: {
            email: isValid.data.email,
        },
    });
    


    if (user) {
        return { error: "User already exists" };
    }


        //Encrypt Password
    const hash=await bcrypt.hash(isValid.data.password, 10);


    //create a stripe User


    //create a  user

    await db.user.create({
        data: {
            email: isValid.data.email,
            password: hash,
        },  
    })



    //redirect the user to signin if he is already registered

    redirect("/signin")

}