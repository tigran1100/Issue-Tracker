"use client";
// NextJS
import { useRouter, useSearchParams } from "next/navigation";

// Radix UI
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

// Types
interface Props {
	items_count: number;
	page_size: number;
	curent_page: number;
}

const Pagination = (Props: Props) => {
	// Hooks
	const router = useRouter();
	const search_params = useSearchParams();

	// Variables
	const page_count = Math.ceil(Props.items_count / Props.page_size);

	// Statements
	if (page_count <= 1) {
		return null;
	}

	// Functions
	const change_page = (page: number) => {
		const url = new URLSearchParams(search_params);
		url.set("page", page.toString());
		router.push("?" + url);
	};

	// Return
	return (
		<>
			<Flex align="center" gap="4" justify="center" className="!my-4">
				<Flex align="center" gap="2">
					<Button
						color="gray"
						variant="soft"
						disabled={Props.curent_page === 1}
						onClick={() => {
							change_page(1);
						}}
					>
						<DoubleArrowLeftIcon />
					</Button>
					<Button
						color="gray"
						variant="soft"
						disabled={Props.curent_page === 1}
						onClick={() => {
							change_page(
								Props.curent_page - 1 !== 0
									? Props.curent_page - 1
									: 1
							);
						}}
					>
						<ChevronLeftIcon />
					</Button>
				</Flex>
				<Text>
					Page {Props.curent_page} of {page_count}
				</Text>
				<Flex align="center" gap="2">
					<Button
						color="gray"
						variant="soft"
						disabled={Props.curent_page === page_count}
						onClick={() => {
							change_page(
								Props.curent_page + 1 !== page_count + 1
									? Props.curent_page + 1
									: page_count
							);
						}}
					>
						<ChevronRightIcon />
					</Button>
					<Button
						color="gray"
						variant="soft"
						disabled={Props.curent_page === page_count}
						onClick={() => {
							change_page(page_count);
						}}
					>
						<DoubleArrowRightIcon />
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default Pagination;
