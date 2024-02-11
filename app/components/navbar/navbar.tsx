"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import "./styles.css";

const Navbar = () => {
	const currentPath = usePathname();

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
			<div className="c-navbar">
				<div className="c-navbar-inner">
					<Link href="/" className="c-navbar-logo">
						<FaBug />
					</Link>
					<div className="c-navbar-links">
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
				</div>
			</div>
		</>
	);
};

export default Navbar;
