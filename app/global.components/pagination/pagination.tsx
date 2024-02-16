// Radix UI
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
	items_count: number;
	page_size: number;
	curent_page: number;
}

const Pagination = (Props: Props) => {
	const page_count = Math.ceil(Props.items_count / Props.page_size);

	if (page_count <= 1) {
		return null;
	}

	return (
		<>
			<Flex align="center" gap="4">
				<Flex align="center" gap="3">
					<DoubleArrowLeftIcon />
					<Button
						color="gray"
						variant="soft"
						disabled={Props.curent_page === 1}
					>
						<ChevronLeftIcon />
					</Button>
				</Flex>
				<Text>
					Page {Props.curent_page} of {page_count}
				</Text>
				<Flex align="center" gap="3">
					<DoubleArrowRightIcon />
					<Button
						color="gray"
						variant="soft"
						disabled={Props.curent_page === page_count}
					>
						<ChevronRightIcon />
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default Pagination;
