import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
	const issues = await prisma.issue.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			created_at: true,
			status: true,
		},
	});
	if (issues) {
		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: { request: request, issues: issues },
			},
			{ status: 200 }
		);
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "Something went wrong",
				data: { request: request },
			},
			{ status: 404 }
		);
	}
}
