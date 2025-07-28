"use server"

import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "~/server/auth";
import { db } from "~/server/db";


const Credits = async () => {
    const session = await auth();

    const user=await db.user.findUnique({
        where:{
            id: session?.user.id
        },select:{
            credits:true
        }

    })

    return (
        <div className="flex items-center gap-4">
            <p>{user?.credits} credits left</p>
            <Link href="/dashboard/pricing">
                <Button>Buy more credits</Button>
            </Link>
        </div>
    )
}


export default Credits;