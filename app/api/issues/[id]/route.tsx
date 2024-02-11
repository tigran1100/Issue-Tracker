// NextJS
import { NextRequest, NextResponse } from "next/server";

// Prisma
import prisma from "@/prisma/client";

// Zod validations
import { schema_single_issue_get_validation } from "@/validations";

interface Props {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, Props: Props) {
	const id = parseInt(Props.params.id);
	if (isNaN(id)) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Id should be a number",
				data: "",
			},
			{ status: 400 }
		);
	}

	const validation = schema_single_issue_get_validation.safeParse({ id: id });
	// return NextResponse.json(
	// 	{
	// 		success: 0,
	// 		reason: "asd",
	// 		data: "",
	// 	},
	// 	{ status: 400 }
	// );

	if (!validation.success) {
		return NextResponse.json(
			{
				success: 0,
				reason: validation.error.format(),
				data: "",
			},
			{ status: 400 }
		);
	}

	const prisma_request = await prisma.issue.findUnique({
		where: {
			id: id,
		},
	});

	if (prisma_request && Object.keys(prisma_request).length !== 0) {
		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: {
					request: prisma_request,
				},
			},
			{ status: 201 }
		);
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "Not found",
				data: "",
			},
			{ status: 404 }
		);
	}
}
