// NextJS
import type { NextApiRequest, NextApiResponse } from "next";

// NextAuth
import NextAuth, { NextAuthOptions } from "next-auth";
import { auth_options } from "./auth_options";

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
