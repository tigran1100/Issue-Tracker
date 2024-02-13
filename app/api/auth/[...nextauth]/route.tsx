// NextJS
import type { NextApiRequest, NextApiResponse } from "next";

// NextAuth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth_options = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	session: {
		strategy: "jwt",
	},
} as any;

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
