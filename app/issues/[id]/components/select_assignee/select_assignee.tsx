"use client";

// React
import { useEffect, useState } from "react";

// Radix UI
import { Select } from "@radix-ui/themes";

// Prisma
import { User } from "@prisma/client";

// Axios
import axios from "axios";

type Props = { id: number };
const Select_assignee = (Props: Props) => {
	// States
	const [state_users, set_state_users] = useState<User[]>([]);

	// Effects
	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
			.then((res) => {
				const result = res.data;
				set_state_users(result);
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Select.Root>
				<Select.Trigger placeholder="Assign..."></Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						{state_users.map((user, index) => {
							return (
								<Select.Item value="1" key={index + 86418412}>
									{user.name}
								</Select.Item>
							);
						})}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	);
};

export default Select_assignee;
