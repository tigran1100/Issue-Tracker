// NextJS
import Link from "next/link";

// Radix UI
import { Button } from "@radix-ui/themes";

const Issues_toolbar = () => {
	return (
		<>
			<Button className="hover:cursor-pointer">
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</>
	);
};

export default Issues_toolbar;
