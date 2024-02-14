// NextJS
import { NextRequest, NextResponse } from "next/server";

// NextAuth
import { auth_options } from "@/app/api/auth/[...nextauth]/auth_options";
import { getServerSession } from "next-auth";

// Prisma
import prisma from "@/prisma/client";

// Zod validations

export async function GET(request: NextRequest) {
	const users = await prisma.user.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return NextResponse.json(users, {
		status: 200,
	});
}
