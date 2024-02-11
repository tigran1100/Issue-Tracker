// NextJS
import { notFound } from "next/navigation";

// Prisma
import prisma from "@/prisma/client";

// Components
import Issue_form from "../../components/issue_form/issue_form";

interface Props {
	params: {
		id: string;
	};
}

const Page = async (Props: Props) => {
	let id = parseInt(Props.params.id);

	const issue = await prisma.issue.findUnique({
		where: {
			id: id,
		},
	});

	if (!issue) {
		notFound();
	}

	return (
		<>
			<div className="page_content">
				<Issue_form issue={issue} />
			</div>
		</>
	);
};

export default Page;
