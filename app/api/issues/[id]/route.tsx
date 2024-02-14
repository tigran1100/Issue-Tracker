// NextJS
import { NextRequest, NextResponse } from "next/server";

// NextAuth
import { auth_options } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Prisma
import prisma from "@/prisma/client";

// Zod validations
import { schema_single_issue_delete_validation } from "@/validations";

interface Props {
	params: {
		id: string;
	};
}

export async function DELETE(request: NextRequest, Props: Props) {
	const session = await getServerSession(auth_options);
	if (!session) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Unauthorised",
				data: {},
			},
			{ status: 401 }
		);
	}

	let id = parseInt(Props.params.id);

	if (isNaN(id)) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Id should be a number",
				data: {},
			},
			{ status: 400 }
		);
	}

	const validation = schema_single_issue_delete_validation.safeParse({
		id: id,
	});
	if (!validation.success) {
		return NextResponse.json(
			{
				success: 0,
				reason: validation.error.format(),
				data: {},
			},
			{ status: 400 }
		);
	}

	const prisma_request = await prisma.issue.delete({
		where: {
			id: id,
		},
	});

	if (prisma_request) {
		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: {
					request: prisma_request,
				},
			},
			{ status: 200 }
		);
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "Not Found",
				data: {
					request: prisma_request,
				},
			},
			{ status: 404 }
		);
	}
}
