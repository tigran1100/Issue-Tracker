// Prisma
import Prisma from "@/prisma/client";

//Radix UI
import { Card, Flex, Text } from "@radix-ui/themes";

// Components
import Link_element from "@/app/global.components/link/link";

// Types
interface Props {
	open: number;
	in_progress: number;
	closed: number;
}

const Issue_summary = async (Props: Props) => {
	return (
		<>
			<Flex className="justify-between flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
				<Card className="w-full">
					<Flex direction="column">
						<Text className="font-medium">Open</Text>
						<Text className="font-semibold">
							<Link_element href="/issues?status=open">
								{Props.open}
							</Link_element>
						</Text>
					</Flex>
				</Card>
				<Card className="w-full">
					<Flex direction="column">
						<Text className="font-medium">In Progress</Text>
						<Text className="font-semibold">
							<Link_element href="/issues?status=in_progress">
								{Props.in_progress}
							</Link_element>
						</Text>
					</Flex>
				</Card>
				<Card className="w-full">
					<Flex direction="column">
						<Text className="font-medium">Closed</Text>
						<Text className="font-semibold">
							<Link_element href="/issues?status=closed">
								{Props.closed}
							</Link_element>
						</Text>
					</Flex>
				</Card>
			</Flex>
		</>
	);
};

export default Issue_summary;
