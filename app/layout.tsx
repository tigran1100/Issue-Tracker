// NextJS
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Radix
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

// Components
import Navbar from "./components/navbar/navbar";
import Auth_Provider from "./auth/provider";

// Css
import "./styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Issue Tracker",
	description: "Issue Tracker by Tigran Balayan",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.className}>
				<Auth_Provider>
					<Theme appearance="light">
						<Navbar />
						{children}
					</Theme>
				</Auth_Provider>
			</body>
		</html>
	);
}
