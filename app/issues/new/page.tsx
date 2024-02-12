// NextJS
import dynamic from "next/dynamic";

// Components
const Issue_form = dynamic(
	() => import("@/app/issues/components/issue_form/issue_form"),
	{ ssr: false }
);

const Create_issue = () => {
	return (
		<>
			<div className="page_content">
				<Issue_form />
			</div>
		</>
	);
};

export default Create_issue;
