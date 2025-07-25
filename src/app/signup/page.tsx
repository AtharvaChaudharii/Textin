"use server";

import { auth } from "~/server/auth"; // ✅ from your auth.ts
import { redirect } from "next/navigation";
import { SignUp } from "~/components/ui/signup";

export default async function Page() {
  const session = await auth(); // ✅ this replaces getServerSession

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <SignUp />
  );
}