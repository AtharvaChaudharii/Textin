"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { Button } from "./button";
import type z from "zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "~/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
// import { toast } from "~/hooks/use-toast"; // Import toast for notifications
import { toast } from "sonner" // Adjust the path as needed to the correct location of use-toast
import Router from "next/router";


type  FormValues = z.infer<typeof signInSchema>;




export const SignUp = () => {

  const onSubmit=async (data: FormValues) => {
    const response=await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard", // Redirect to dashboard after successful sign-in
      redirect: false, // Prevent automatic redirect, handle it manually
    });
    if (response?.error) {
      // Handle error case
      const id = toast("Wrong password or email");
      setTimeout(() => {
        toast.dismiss(id);
      }, 1500);

      }else if (response?.ok) {

        Router.push("/dashboard"); // Redirect to dashboard on success
        // Handle success case
        // toast({
        //   title: "Sign In Successful",
        //   description: "You have successfully signed in.",
        //   variant: "success",
        // }); 
    };
}


  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(signInSchema) });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex  flex-col gap-4">
        <Link href="/" className="flex items-center gap-2">
          <MdOutlineArrowBack className="h-4 w-4"/>
          <p className="leading-7">Go Back</p>
        </Link>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" type="email" placeholder="Enter your email" />
                 {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password" type="password" placeholder="Enter your password" />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">Already have an account? <Link href="/signin" className="text-blue-500 hover:underline">Sign In</Link></p>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}