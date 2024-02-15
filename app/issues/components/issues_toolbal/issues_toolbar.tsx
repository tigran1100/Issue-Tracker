// NextJS
import Link from "next/link";

// Radix UI
import { Button, Flex } from "@radix-ui/themes";
import Component_filter_by_status from "./Component_filter_by_status";

const Issues_toolbar = () => {
	return (
		<>
			<Flex width="100%" gap="2" align="center">
				<Link href="/issues/new">
					<Button className="hover:cursor-pointer">New Issue</Button>
				</Link>
				<Component_filter_by_status />
			</Flex>
		</>
	);
};

export default Issues_toolbar;
