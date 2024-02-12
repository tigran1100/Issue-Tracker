// NextJS
import { notFound } from "next/navigation";
import Link from "next/link";

// React
import ReactMarkdown from "react-markdown";
import { FaPencil } from "react-icons/fa6";

// Types
import { Issue } from "@/app/global.types/types";

// Prisma
import prisma from "@/prisma/client";

// Zod validations
import { schema_single_issue_get_validation } from "@/validations";

// Radix UI
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";

// Components
import Issue_status_badge from "../components/issue_status_badge/issue_status_badge";

// Delay
import delay from "delay";

interface Props {
	params: {
		id: string;
	};
}

const Page = async (Props: Props) => {
	let id = parseInt(Props.params.id);
	let issue: Issue;

	if (isNaN(id)) {
		notFound();
	}

	const validation = schema_single_issue_get_validation.safeParse({ id: id });
	if (!validation.success) {
		notFound();
	}

	const prisma_request = await prisma.issue.findUnique({
		where: {
			id: id,
		},
	});

	if (prisma_request) {
		issue = prisma_request;
	} else {
		notFound();
	}

	return (
		<>
			<div className="page_content">
				<Flex gap="4" direction="column" className="">
					<Flex gap="3" className="w-full">
						<Heading>{issue.title}</Heading>
						<Link href={`/issues/${issue.id}/edit`}>
							<Button className="hover:cursor-pointer">
								<Flex gap="1" align="center">
									<FaPencil />
									Edit
								</Flex>
							</Button>
						</Link>
					</Flex>
					<Flex gap="3">
						<Issue_status_badge status={issue.status} />
						<Text>
							{new Date(issue.created_at).toLocaleString()}
						</Text>
					</Flex>
					<Card className="max-w-96">
						<ReactMarkdown className="prose">
							{issue.description}
						</ReactMarkdown>
					</Card>
				</Flex>
			</div>
		</>
	);
};

export default Page;
