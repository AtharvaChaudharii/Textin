"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { Button } from "./button";
export const SignIn = () => {
 
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex  flex-col gap-4">
        <Link href="/" className="flex items-center gap-2">
          <MdOutlineArrowBack className="h-4 w-4"/>
          <p className="leading-7">Go Back</p>
        </Link>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button type="submit">Sign In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}