// NextJS
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

// NextAuth
import { auth_options } from "@/app/api/auth/[...nextauth]/auth_options";
import { getServerSession } from "next-auth";

// React
import ReactMarkdown from "react-markdown";

// Types
// import { Issue } from "@/app/global.types/types";

// Prisma
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";

// Zod validations
import { schema_single_issue_get_validation } from "@/validations";

// Radix UI
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";

// Components
import Issue_status_badge from "../../global.components/issue_status_badge/issue_status_badge";
import Edit_button from "./components/edit_button/edit_button";
import Delete_button from "./components/delete_button/delete_button";
import Select_assignee from "./components/select_assignee/select_assignee";

// Delay
import delay from "delay";
import { describe } from "node:test";

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
		issue = prisma_request as Issue;
	} else {
		notFound();
	}

	const session = await getServerSession(auth_options);

	return (
		<>
			<div className="page_content">
				<Flex gap="4" direction="column" className="max-w-xl">
					{(session as any) && (
						<Flex gap="3" direction="column" className="w-full">
							<Heading>{issue.title}</Heading>
							<Flex gap="1">
								<Select_assignee issue={issue} />
								<Edit_button id={issue.id} />
								<Delete_button id={issue.id} />
							</Flex>
						</Flex>
					)}
					<Flex gap="3">
						<Issue_status_badge status={issue.status} />
						<Text>
							{new Date(issue.created_at).toLocaleString()}
						</Text>
					</Flex>
					<Card>
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
export async function generateMetadata(Props: Props) {
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(Props.params.id),
		},
	});

	return {
		title: issue?.title,
		describe: "Details of issue " + issue?.id,
	};
}
