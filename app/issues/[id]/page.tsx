// NextJS
import { notFound } from "next/navigation";

// React
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";
import { FaPencil } from "react-icons/fa6";

// Prisma
import prisma from "@/prisma/client";

// Radix UI
import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";

// Components
import Issue_status_badge from "../components/issue_status_badge/issue_status_badge";

// Delay
import delay from "delay";
import Link from "next/link";

interface Props {
	params: {
		id: string;
	};
}

const Page = async (Props: Props) => {
	let id = parseInt(Props.params.id);
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/issues/${id}`,
		{
			method: "GET",
			cache: "no-store",
		}
	);
	const result = await request.json();
	const issue = result.data.request;

	if (!issue) {
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
