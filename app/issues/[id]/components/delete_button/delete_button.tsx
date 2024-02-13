"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

const Delete_button = (Props: { id: number }) => {
	// Hooks
	const router = useRouter();

	// Functions
	const delete_issue = () => {
		axios
			.delete(`${process.env.NEXT_PUBLIC_API_URL}/issues/${Props.id}`)
			.then((res) => {
				let response = res.data;
				if (response.success === 1) {
					router.push("/issues");
					router.refresh();
				}
			})
			.catch((err) => {
				console.warn(err);
				router.refresh();
			});
	};

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
									delete_issue();
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
