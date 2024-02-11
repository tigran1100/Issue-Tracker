"use client";
// NextJS
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// React
import { useState, useEffect, useCallback, Suspense } from "react";

// React Icons
import { MdErrorOutline } from "react-icons/md";

// Radix UI
import { Button, Callout, TextField } from "@radix-ui/themes";

// SimpleMDE
// import SimpleMDE from "react-simplemde-editor";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});
import "easymde/dist/easymde.min.css";

// Axios
import axios from "axios";

// Schemas
import { schema_issue_create_validation } from "@/validations";

// Css
import "./styles.css";

// Delay
import delay from "delay";

interface Props {
	issue?: {
		id: number;
		title: string;
		description: string;
	};
}

const Issue_form = (Props: Props) => {
	// Hooks
	const router = useRouter();

	// States
	const [state_title, set_state_title] = useState(
		Props.issue ? Props.issue.title : ""
	);
	const [state_description, set_state_description] = useState(
		Props.issue ? Props.issue.description : ""
	);
	const [state_submit_error, set_state_submit_error] = useState<String>("");
	const [state_submit_status, set_state_submit_status] =
		useState<String>("Idle");

	// Functions
	const description_onchange_event = useCallback((value: string) => {
		set_state_description(value);
	}, []);

	const handle_submit = async () => {
		if (state_submit_status === "in_progress") {
			return;
		}

		const validation = schema_issue_create_validation.safeParse({
			title: state_title,
			description: state_description,
		});

		if (!validation.success) {
			const errors = validation.error.format();
			// console.log(errors);
			if (errors?.title?._errors?.[0]) {
				set_state_submit_error(errors?.title?._errors?.[0]);
			} else if (errors?.description?._errors?.[0]) {
				set_state_submit_error(errors?.description?._errors?.[0]);
			} else {
				set_state_submit_error(
					"An unexpected error occured, please try again later"
				);
			}
			return;
		} else {
			set_state_submit_error("");
			set_state_submit_status("in_progress");
		}

		if (Props.issue) {
			axios
				.patch(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
					id: Props.issue.id,
					title: state_title,
					description: state_description,
				})
				.then((res) => {
					if (res.data.success === 0) {
						set_state_submit_error("Something went wrong");
					} else if (res.data.success === 1) {
						router.push(`/issues/${Props.issue?.id}`);
					}
				})
				.catch((err) => {
					console.warn(err);

					const error_reason_title =
						err?.response?.data?.reason?.title?._errors[0] ?? null;
					const error_reason_description =
						err?.response?.data?.reason?.description?._errors[0] ??
						null;
					if (error_reason_title) {
						set_state_submit_error(error_reason_title);
					} else if (error_reason_description) {
						set_state_submit_error(error_reason_description);
					} else {
						set_state_submit_error("An unknown error occured");
					}
				})
				.finally(() => {
					set_state_submit_status("");
				});
		} else {
			axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
					title: state_title,
					description: state_description,
				})
				.then((res) => {
					if (res.data.success === 0) {
						set_state_submit_error("Something went wrong");
					} else if (res.data.success === 1) {
						set_state_title("");
						set_state_description("");
					}
				})
				.catch((err) => {
					console.warn(err);

					const error_reason_title =
						err?.response?.data?.reason?.title?._errors[0] ?? null;
					const error_reason_description =
						err?.response?.data?.reason?.description?._errors[0] ??
						null;
					if (error_reason_title) {
						set_state_submit_error(error_reason_title);
					} else if (error_reason_description) {
						set_state_submit_error(error_reason_description);
					} else {
						set_state_submit_error("An unknown error occured");
					}
				})
				.finally(() => {
					set_state_submit_status("");
				});
		}
	};

	return (
		<>
			<div className="max-w-xl space-y-2">
				<TextField.Root>
					<TextField.Input
						placeholder="Title"
						onChange={(e) => {
							set_state_title(e.target.value);
						}}
						value={state_title}
					/>
				</TextField.Root>
				<SimpleMDE
					placeholder="Description"
					onChange={description_onchange_event}
					value={state_description}
				></SimpleMDE>
				<div className="flex flex-col space-y-1">
					<Button
						onClick={() => {
							handle_submit();
						}}
						className="hover:cursor-pointer"
					>
						{Props.issue ? "Update the issue" : "Submit New Issue"}
					</Button>
				</div>
				{state_submit_error && (
					<Callout.Root color="red">
						<Callout.Icon>
							<MdErrorOutline />
						</Callout.Icon>
						<Callout.Text>{state_submit_error}</Callout.Text>
					</Callout.Root>
				)}
			</div>
		</>
	);
};

export default Issue_form;
