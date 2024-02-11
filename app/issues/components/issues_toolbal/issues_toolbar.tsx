// NextJS
import Link from "next/link";

// Radix UI
import { Button } from "@radix-ui/themes";

const Issues_toolbar = () => {
	return (
		<>
			<Link href="/issues/new">
				<Button className="hover:cursor-pointer">New Issue</Button>
			</Link>
		</>
	);
};

export default Issues_toolbar;
