"use client";

import {PiSignOutLight} from "react-icons/pi";
import { signOut } from "next-auth/react";


const SignOut = () => {
    return (
        <PiSignOutLight  onClick={() => signOut()} className="h-6 cursor-pointer w-6" />
    )
}

export default SignOut;