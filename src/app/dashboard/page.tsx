"use server";
import {authOptions} from "~/server/auth";

import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import ThumbnailCreator from "~/components/thumbnail-creator";
const page= async ()=>{

    const serverSession=await getServerSession(authOptions);

    const user= await db.user.findUnique({
        where: {
            id: serverSession?.user.id
        },
        select: {
            credits: true
        }
    })
    return(
        <div className="flex max-w-full h-screen w-full items-center justify-center px-4 md:max-w-3xl md:px-0">
            <div className="flex max-w-full flex-col gap-10">
                {user?.credits === 0 ? (
                <div className="flex flex-col px-10 md:mt-10">
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Hi There</h1>
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Want To Create Thumbnail?</h1>
                    <div className=" mt-2 flex flex-col gap-2">
                        <p className=" leading-7 text-muted-foreground">Buy more credits to continue generationg thumbnails.</p>
                        <Link href="/dashboard/pricing">
                            <Button>Buy Credits</Button>
                        </Link>
                    </div>
                    <div className="mt-8">Show recent thumbnails here</div>
                </div>

                ): (
                <div>
                    <ThumbnailCreator/>
                </div>
                )}
            </div>
        </div>
    )
}

export default page;