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
				<Issue_form issue={issue} />
			</div>
		</>
	);
};

export default Page;
