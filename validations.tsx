import { z } from "zod";

export const schema_issue_create_validation = z.object({
	title: z
		.string()
		.max(255, "Title can't be longer than 255 characters")
		.min(1, "Title is required"),
	description: z
		.string()
		.max(65535, "Description can't be longer than 65,535 characters")
		.min(1, "Description is required"),
});

export const schema_issue_patch_validation = z.object({
	id: z.number().min(1, "Id is required"),
	title: z
		.string()
		.max(255, "Title can't be longer than 255 characters")
		.min(1, "Title is required"),
	description: z
		.string()
		.max(65535, "Description can't be longer than 65,535 characters")
		.min(1, "Description is required"),
});