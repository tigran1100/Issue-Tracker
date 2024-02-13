"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Delete_button = (Props: { id: number }) => {
	// Hooks
	const router = useRouter();

	// States
	const [state_error, set_state_error] = useState<boolean>(false);
	const [state_is_deleting, set_state_is_deleting] = useState<boolean>(false);

	// Functions
	const delete_issue = () => {
		set_state_is_deleting(true);
		axios
			.delete(`${process.env.NEXT_PUBLIC_API_URL}/issues/${Props.id}`)
			.then((res) => {
				let response = res.data;
				if (response.success === 1) {
					router.push("/issues");
					router.refresh();
				} else {
					set_state_error(true);
					router.refresh();
				}
			})
			.catch((err) => {
				console.warn(err);
				set_state_error(true);
				router.refresh();
			})
			.finally(() => {
				setTimeout(() => {
					set_state_is_deleting(false);
				}, 1000);
			});
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button
						color="red"
						className="hover:cursor-pointer"
						disabled={state_is_deleting}
					>
						{state_is_deleting ? (
							<>
								Deleting
								<PuffLoader color="gray" size="18px" />
							</>
						) : (
							<>
								<MdDelete />
								Delete
							</>
						)}
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
			<AlertDialog.Root open={state_error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						An unexpected error occured
					</AlertDialog.Description>
					<Button
						color="gray"
						className="!mt-2 !cursor-pointer"
						onClick={() => {
							set_state_error(false);
						}}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default Delete_button;
