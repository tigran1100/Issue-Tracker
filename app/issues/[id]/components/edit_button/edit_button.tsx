import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

const Edit_button = (Props: { id: number }) => {
	return (
		<>
			<Link href={`/issues/${Props.id}/edit`}>
				<Button className="hover:cursor-pointer" color="blue">
					<Flex gap="2" align="center">
						<FaPencil />
						Edit
					</Flex>
				</Button>
			</Link>
		</>
	);
};

export default Edit_button;
