"use client";
// NextJS
import { useRouter, useSearchParams } from "next/navigation";

// React
import { useEffect, useState } from "react";

// Radix UI
import { Select } from "@radix-ui/themes";

const Component_filter_by_status = () => {
	// Hooks
	const router = useRouter();
	const search_params = useSearchParams();

	// Functions
	const get_filter_status = () => {
		let status = search_params.get("status");

		if (!status) {
			return "all";
		} else {
			if (status === "closed") {
				return "closed";
			} else if (status === "open") {
				return "open";
			} else if (status === "in_progress") {
				return "in_progress";
			} else if (status === "all") {
				return "all";
			} else {
				return "all";
			}
		}
	};

	const set_new_status = (new_status: string) => {
		const url = new URLSearchParams(search_params);

		if (new_status === "all") {
			url.delete("status");
		} else {
			url.set("status", new_status);
		}

		router.push("?" + url);
	};

	return (
		<>
			<Select.Root
				defaultValue={get_filter_status()}
				onValueChange={(new_status) => {
					set_new_status(new_status);
				}}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Group>
						<Select.Item value="all">All</Select.Item>
						<Select.Item value="open">Open</Select.Item>
						<Select.Item value="in_progress">
							In Progress
						</Select.Item>
						<Select.Item value="closed">Closed</Select.Item>
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	);
};

export default Component_filter_by_status;
