// NextJS
import { NextRequest, NextResponse } from "next/server";

// Prisma
import prisma from "@/prisma/client";

// Zod validations
import {
	schema_issue_create_validation,
	schema_issue_patch_validation,
} from "@/validations";

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

export async function POST(request: NextRequest) {
	if (
		!request.headers.get("Content-Length") ||
		request.headers.get("Content-Length") === "0"
	) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Request body is required",
				data: { request: request },
			},
			{ status: 400 }
		);
	}

	let body = await request.json();
	let validation = schema_issue_create_validation.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{
				success: 0,
				reason: validation.error.format(),
				data: { body: body },
			},
			{ status: 400 }
		);
	}

	const prisma_create_request = await prisma.issue.create({
		data: {
			title: body.title,
			description: body.description,
		},
	});

	if (prisma_create_request) {
		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: {
					body: body,
					request: prisma_create_request,
				},
			},
			{ status: 201 }
		);
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "Something went wrong, contact the developer for more details",
				data: { body: body },
			},
			{ status: 201 }
		);
	}
}

export async function PATCH(request: NextRequest) {
	if (
		!request.headers.get("Content-Length") ||
		request.headers.get("Content-Length") === "0"
	) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Request body is required",
				data: { request: request },
			},
			{ status: 400 }
		);
	}

	let body = await request.json();
	let validation = schema_issue_patch_validation.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{
				success: 0,
				reason: validation.error.format(),
				data: { body: body },
			},
			{ status: 400 }
		);
	}

	const prisma_create_request = await prisma.issue.update({
		where: {
			id: body.id,
		},
		data: {
			title: body.title,
			description: body.description,
		},
	});

	if (prisma_create_request) {
		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: {
					body: body,
				},
			},
			{ status: 201 }
		);
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "Something went wrong, contact the developer for more details",
				data: { body: body },
			},
			{ status: 201 }
		);
	}
}
