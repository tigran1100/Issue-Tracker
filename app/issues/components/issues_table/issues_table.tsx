// NextJS
import Link from "next/link";
import { useRouter } from "next/navigation";

// Axios
import axios from "axios";

// Radix UI
import { Badge, Table } from "@radix-ui/themes";

// Delay
import delay from "delay";

// Components
import Issue_status_badge from "../issue_status_badge/issue_status_badge";
import Link_element from "@/app/global.components/link/link";

interface Issue {
	id: number;
	title: string;
	status: string;
	description: string;
	created_at: string;
}

interface Response {
	data: {
		request: any;
		issues: Issue[] | [];
	};
	reason: string;
	success: number;
}

const Show_issues = async () => {
	const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
		method: "GET",
		cache: "no-store",
	});
	const response = await request.json();
	// await delay(1400);

	let issues: Issue[] = [];

	if (response.success === 1) {
		issues = response.data.issues;
	} else {
		issues = [];
	}

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
