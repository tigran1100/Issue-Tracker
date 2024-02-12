// NextJS
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

// Types
import { Issue } from "@/app/global.types/types";

// Prisma
import prisma from "@/prisma/client";

// Zod validations
import { schema_single_issue_get_validation } from "@/validations";

// Components
import Issue_form from "../../components/issue_form/issue_form";

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
		issue = prisma_request;
	} else {
		notFound();
	}

	revalidatePath("/issues");

	return (
		<>
			<div className="page_content">
				<Issue_form issue={issue} />
			</div>
		</>
	);
};

export default Page;
