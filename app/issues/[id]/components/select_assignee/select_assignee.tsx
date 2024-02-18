"use client";
// NextJS
import { useRouter } from "next/navigation";

// React
import { useEffect, useState } from "react";

// Radix UI
import { Select } from "@radix-ui/themes";

// Prisma
import { Issue, User } from "@prisma/client";

// Axios
import axios from "axios";

// Toaster
import toast, { Toaster } from "react-hot-toast";

type Props = { issue: Issue };
const Select_assignee = (Props: Props) => {
	// Hooks
	const router = useRouter();

	// States
	const [state_users, set_state_users] = useState<User[]>([]);

	// Effects
	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
			.then((res) => {
				const result = res.data as User[];
				set_state_users(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Select.Root
				onValueChange={(select_user_id) => {
					axios
						.patch(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
							id: Props.issue.id,
							assigned_to_user_id:
								select_user_id === "Unassigned"
									? null
									: select_user_id,
						})
						.then((res) => {
							router.refresh();
						})
						.catch(() => {
							toast.error("Changes could not be saved");
						});
				}}
				defaultValue={Props.issue.assigned_to_user_id || "Unassigned"}
			>
				<Select.Trigger
					placeholder="Assign..."
					className="min-w-28 !cursor-pointer"
				></Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item
							value="Unassigned"
							className="!cursor-pointer"
						>
							Unassigned
						</Select.Item>
						{state_users.map((user, index) => {
							return (
								<Select.Item
									value={user.id}
									key={index + 86418412}
									className="!cursor-pointer"
								>
									{user.name}
								</Select.Item>
							);
						})}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

export default Select_assignee;
