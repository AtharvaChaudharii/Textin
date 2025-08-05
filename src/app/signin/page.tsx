import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth"; // your config file
import { redirect } from "next/navigation";
import { SignIn } from "~/components/ui/signin";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return <SignIn />;
}