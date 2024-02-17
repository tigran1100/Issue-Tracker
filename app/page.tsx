// NextJS
import { Metadata } from "next";

// Prisma
import Prisma from "@/prisma/client";

// Components
import Issue_chart from "./components/issue_chart/issue_chart";
import Issue_summary from "./components/issue_summary/issue_summary";
import Latest_issues from "./components/latest_issues/latest_issues";

export default async function Home() {
	let issue_types_count = {
		open: 0,
		closed: 0,
		in_progress: 0,
	};

	const issues = await Prisma.issue.findMany();
	issues.map((issue: any) => {
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
			<div className="page_content space-y-4">
				<Latest_issues />
				<Issue_summary
					open={issue_types_count.open}
					in_progress={issue_types_count.in_progress}
					closed={issue_types_count.closed}
				/>
				<Issue_chart
					open={issue_types_count.open}
					in_progress={issue_types_count.in_progress}
					closed={issue_types_count.closed}
				/>
			</div>
		</>
	);
}

export const metadata: Metadata = {
	title: "Issue Tracker - Dashboard",
	description: "View a summary of project issues",
};
