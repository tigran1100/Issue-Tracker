// NextJS
import Link from "next/link";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

// Radix UI
import { Table } from "@radix-ui/themes";

// Types
import { Issue } from "@/app/global.types/types";

// Prisma
import prisma from "@/prisma/client";

// Delay
import delay from "delay";

// Components
import Issue_status_badge from "../issue_status_badge/issue_status_badge";
import Link_element from "@/app/global.components/link/link";

const Show_issues = async () => {
	const issues: Issue[] = await prisma.issue.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			created_at: true,
			status: true,
		},
	});

	revalidatePath("/issues");

	return (
		<>
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden sm:table-cell">
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden sm:table-cell">
							Created
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issues?.map((issue, index) => (
						<Table.Row
							key={"65431" + index}
							className="cursor-pointer hover:bg-slate-100 transition-all"
							// onClick={() => {
							// 	router.push("/issues/" + issue.id);
							// }}
						>
							<Table.RowHeaderCell className="text-center sm:text-start">
								<Link_element href={`/issues/${issue.id}`}>
									{issue.title}
								</Link_element>
								<div className="block mt-1 sm:hidden">
									<Issue_status_badge status={issue.status} />
								</div>
							</Table.RowHeaderCell>
							<Table.Cell className="hidden sm:table-cell">
								<Issue_status_badge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden sm:table-cell">
								{new Date(issue.created_at).toLocaleString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</>
	);
};

export default Show_issues;
