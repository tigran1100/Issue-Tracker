"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

const Delete_button = (Props: { id: number }) => {
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" className="hover:cursor-pointer">
						<MdDelete />
						Delete
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content style={{ maxWidth: 450 }}>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Are you sure you want to delete this issue? This action
						cannot be undone.
					</AlertDialog.Description>

					<Flex gap="2" mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button
								variant="soft"
								color="gray"
								className="hover:cursor-pointer"
							>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button
								variant="solid"
								color="red"
								className="hover:cursor-pointer"
								onClick={() => {
									console.log("Clicked");
								}}
							>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default Delete_button;
