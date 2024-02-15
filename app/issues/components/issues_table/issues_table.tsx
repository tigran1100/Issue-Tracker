// NextJS
import { headers } from "next/headers";

// React Icons
import { FaArrowUp } from "react-icons/fa6";

// Radix UI
import { Flex, Table } from "@radix-ui/themes";

// Types
import { Issue } from "@/app/global.types/types";

// Prisma
import prisma from "@/prisma/client";

// Delay
import delay from "delay";

// Components
import Issue_status_badge from "../issue_status_badge/issue_status_badge";
import Link_element from "@/app/global.components/link/link";
import Link from "next/link";

const Show_issues = async (Props: any) => {
	// Values
	const search_params = Props.parent_props.searchParams;
	let search_filter = "all";

	if (Object.keys(search_params).length > 0 && search_params.status) {
		if (search_params.status === "all") {
			search_filter = "all";
		} else if (search_params.status === "open") {
			search_filter = "open";
		} else if (search_params.status === "closed") {
			search_filter = "closed";
		} else if (search_params.status === "in_progress") {
			search_filter = "in progress";
		} else {
			search_filter = "all";
		}
	} else {
		search_filter = "all";
	}

	let orderByParam;
	if (Object.keys(search_params).length > 0 && search_params.orderBy) {
		if (search_params.orderBy === "id") {
			orderByParam = "id";
		} else if (search_params.orderBy === "status") {
			orderByParam = "status";
		} else if (search_params.orderBy === "date") {
			orderByParam = "created_at";
		} else {
			orderByParam = "id";
		}
	} else {
		orderByParam = "id";
	}

	const issues: Issue[] = await prisma.issue.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			created_at: true,
			status: true,
		},
		orderBy: {
			[orderByParam]: "asc",
		},
	});

	let filtered_issues;
	if (search_filter === "all") {
		filtered_issues = issues;
	} else {
		filtered_issues = issues.filter((issue) => {
			return issue.status === search_filter;
		});
	}

	return (
		<>
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>
							<Link
								href={{
									query: {
										...search_params,
										orderBy: "id",
									},
								}}
							>
								Issue
								{search_params.orderBy === "id" && (
									<FaArrowUp className="inline ml-1 w-3" />
								)}
							</Link>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden sm:table-cell">
							<Link
								href={{
									query: {
										...search_params,
										orderBy: "status",
									},
								}}
							>
								Status
								{search_params.orderBy === "status" && (
									<FaArrowUp className="inline ml-1 w-3" />
								)}
							</Link>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden sm:table-cell">
							<Link
								href={{
									query: {
										...search_params,
										orderBy: "date",
									},
								}}
							>
								Created
								{search_params.orderBy === "date" && (
									<FaArrowUp className="inline ml-1 w-3" />
								)}
							</Link>
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{filtered_issues?.map((issue, index) => (
						<Table.Row
							key={"65431" + index}
							className="cursor-pointer hover:bg-slate-100 transition-all"
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
