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

// export const schema_issue_patch_validation = z.object({
// 	id: z.number().min(1, "Id is required"),
// 	title: z
// 		.string()
// 		.max(255, "Title can't be longer than 255 characters")
// 		.min(1, "Title is required"),
// 	description: z
// 		.string()
// 		.max(65535, "Description can't be longer than 65,535 characters")
// 		.min(1, "Description is required"),
// });

export const schema_issue_patch_validation = z.object({
	id: z.number().min(1, "Id is required"),
	title: z
		.string()
		.max(255, "Title can't be longer than 255 characters")
		.min(1, "Title is required")
		.optional(),
	description: z
		.string()
		.max(65535, "Description can't be longer than 65,535 characters")
		.min(1, "Description is required")
		.optional(),
	assigned_to_user_id: z
		.string()
		.min(1, "assigned_to_user_id is required")
		.max(255, "assigned_to_user_id can't have more than 255 characters")
		.optional()
		.nullable(),
});

export const schema_single_issue_get_validation = z.object({
	id: z.number().min(1, "Id is required"),
});

export const schema_single_issue_delete_validation = z.object({
	id: z.number().min(1, "Id is required"),
});
