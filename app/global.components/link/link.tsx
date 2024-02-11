import Link from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
	href: string;
	children: ReactNode;
}

const Link_element = (Props: Props) => {
	return (
		<>
			<Link href={Props.href} legacyBehavior>
				<RadixLink>{Props.children}</RadixLink>
			</Link>
		</>
	);
};

export default Link_element;
