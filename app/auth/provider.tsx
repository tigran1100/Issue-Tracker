"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Auth_Provider = (Props: Props) => {
	return <SessionProvider>{Props.children}</SessionProvider>;
};

export default Auth_Provider;
