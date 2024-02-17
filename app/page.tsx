// Components
import Issue_chart from "./components/issue_chart/issue_chart";
import Issue_summary from "./components/issue_summary/issue_summary";
import Latest_issues from "./components/latest_issues/latest_issues";

export default function Home() {
	return (
		<>
			<div className="page_content space-y-4">
				<Latest_issues />
				<Issue_summary />
				<Issue_chart />
			</div>
		</>
	);
}
