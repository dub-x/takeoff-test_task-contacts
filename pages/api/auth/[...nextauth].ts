import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import { confirmPasswordHash } from "../../../src/utils/confirmPasswordHash";
import prisma from "../../../src/lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (user) {
            if (await confirmPasswordHash(credentials?.password, user.password)) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
              };
            }
            throw new Error("Не верные данные!");
          }
        } catch (err: any) {
          console.error("Authorize error:", err.message);
          throw err;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
