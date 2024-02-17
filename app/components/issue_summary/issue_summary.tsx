import Link_element from "@/app/global.components/link/link";
import Prisma from "@/prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";

const Issue_summary = async () => {
	let issue_types_count = {
		open: 0,
		closed: 0,
		in_progress: 0,
	};

	const issues = await Prisma.issue.findMany();
	issues.map((issue) => {
		if (issue.status === "open") {
			issue_types_count.open++;
		} else if (issue.status === "closed") {
			issue_types_count.closed++;
		} else if (issue.status === "in progress") {
			issue_types_count.in_progress++;
		}
	});

	return (
		<>
			<Flex className="justify-between flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
				<Card className="w-full">
					<Flex direction="column">
						<Text className="font-medium">Open</Text>
						<Text className="font-semibold">
							<Link_element
								children={issue_types_count.open}
								href="/issues?status=open"
							/>
						</Text>
					</Flex>
				</Card>
				<Card className="w-full">
					<Flex direction="column">
						<Text className="font-medium">In Progress</Text>
						<Text className="font-semibold">
							<Link_element
								children={issue_types_count.in_progress}
								href="/issues?status=in_progress"
							/>
						</Text>
					</Flex>
				</Card>
				<Card className="w-full">
					<Flex direction="column">
						<Text className="font-medium">Closed</Text>
						<Text className="font-semibold">
							<Link_element
								children={issue_types_count.closed}
								href="/issues?status=closed"
							/>
						</Text>
					</Flex>
				</Card>
			</Flex>
		</>
	);
};

export default Issue_summary;
