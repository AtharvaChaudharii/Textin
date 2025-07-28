import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "~/schemas/auth";

import { db } from "~/server/db";

import bcrypt from "bcryptjs";
import { ZodError } from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth" {
  interface JWT {
    id: string;

  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Validate with zod
          const validatedCredentials = signInSchema.safeParse(credentials);
          
          if (!validatedCredentials.success) {
            console.log("Validation failed:", validatedCredentials.error);
            return null;
          }
          
          const { email, password } = validatedCredentials.data;
          
          // Find user
          const user = await db.user.findUnique({
            where: { email }
          });
          
          if (!user || !user.password) {
            console.log("User not found or has no password");
            return null;
          }
          
          // Compare password
          const passwordMatch = await bcrypt.compare(password, user.password);
          
          if (!passwordMatch) {
            console.log("Password doesn't match");
            return null;
          }
          
          // Return user without password
          const { password: _, ...userWithoutPassword } = user;
          console.log("Authentication successful for:", email);
          
          return userWithoutPassword;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }
  )
   
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages:{
    signIn:"/signin"

  },
  secret: process.env.NEXTAUTH_SECRET,

  session:{
    strategy:"jwt",
  },
  adapter: PrismaAdapter(db),

} satisfies NextAuthConfig;
