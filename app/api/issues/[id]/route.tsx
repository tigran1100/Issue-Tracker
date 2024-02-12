// NextJS
import { NextRequest, NextResponse } from "next/server";

// Prisma
import prisma from "@/prisma/client";

// Zod validations
import {} from "@/validations";

interface Props {
	params: {
		id: string;
	};
}
