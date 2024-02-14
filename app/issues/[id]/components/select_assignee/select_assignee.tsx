"use client";

// Radix UI
import { Select } from "@radix-ui/themes";

type Props = { id: number };
const Select_assignee = (Props: Props) => {
	return (
		<>
			<Select.Root>
				<Select.Trigger placeholder="Assign..."></Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value="1">Tigran</Select.Item>
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	);
};

export default Select_assignee;
