"use client";
// NextJS
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

// React Icons
import { FaBug } from "react-icons/fa";

// React Loading Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Radix UI
import { Avatar, Button, DropdownMenu, Text } from "@radix-ui/themes";

// Styles
import "./styles.css";

const Navbar = () => {
	return (
		<>
			<div className="c-navbar">
				<div className="c-navbar-inner page_content">
					<Link href="/" className="c-navbar-left">
						<FaBug />
					</Link>
					<div className="c-navbar-right">
						<Navbar_links />
						<Dropdown_menu />
					</div>
				</div>
			</div>
		</>
	);
};

const Navbar_links = () => {
	// Hooks
	const currentPath = usePathname();
	const session = useSession();

	const nav_links = [
		{
			name: "Dashboard",
			href: "/",
		},
		{
			name: "Issues",
			href: "/issues",
		},
	] as {
		name: string;
		href: string;
	}[];

	return (
		<>
			<div className="c-navbar-links gap-2">
				{session.status === "loading" ? (
					<>
						{nav_links.map((link, index) => (
							<Skeleton key={1674518 + index} width="60px" />
						))}
					</>
				) : (
					<>
						<div className="flex gap-3">
							{nav_links.map((link, index) => (
								<Link
									key={76518 + index}
									href={link.href}
									className={`c-navbar-link font-medium text-zinc-500 hover:text-zinc-800 transition-all ${
										currentPath === link.href
											? "text-zinc-800"
											: ""
									}`}
								>
									{link.name}
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};

const Dropdown_menu = () => {
	// Hooks
	const session = useSession();

	return (
		<>
			{session.status === "authenticated" ? (
				<>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Avatar
								radius="full"
								size="2"
								className="cursor-pointer"
								src={session.data?.user?.image!}
								fallback={session.data?.user?.name?.charAt(1)!}
								referrerPolicy="no-referrer"
							/>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Label>
								<Text color="gray" weight="medium">
									{session.data?.user?.email}
								</Text>
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Label>
								<Link
									href="/api/auth/signout"
									className="!w-full"
								>
									<Button
										color="red"
										className="!cursor-pointer !w-full"
									>
										Logout
									</Button>
								</Link>
							</DropdownMenu.Label>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</>
			) : (
				session.status === "unauthenticated" && (
					<>
						<Link href="/api/auth/signin">
							<Button color="blue" className="!cursor-pointer">
								Login
							</Button>
						</Link>
					</>
				)
			)}
		</>
	);
};

export default Navbar;
