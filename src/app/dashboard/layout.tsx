"use server";
import Link from "next/link";
import Credits from "~/components/credits";
import SignOut from "~/components/signout";
import { Button } from "~/components/ui/button";
import "~/styles/globals.css";  


export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex  h-screen w-full flex-col items-center overflow-y-auto px-6 py-6 ">
        <nav className="flex w-full items-center justify-end pb-6">
           
           <div className="flex items-center gap-4">
            <Credits/>
            <SignOut/>
           </div>
        </nav>
        {children}
    </div>
  );
}
