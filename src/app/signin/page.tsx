"use server";

import { auth } from "~/server/auth"; // ✅ from your auth.ts
import { redirect } from "next/navigation";
import { SignIn } from "~/components/ui/signin";

export default async function Page() {
  const session = await auth(); // ✅ this replaces getServerSession

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <SignIn />
  );
}