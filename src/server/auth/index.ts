import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./config";

export const authOptions: NextAuthOptions = authConfig;