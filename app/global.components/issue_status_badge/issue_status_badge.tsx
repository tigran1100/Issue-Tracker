import { Badge } from "@radix-ui/themes";

interface Props {
	status: string;
}

const Issue_status_badge = (Props: Props) => {
	const status = Props.status;

	return (
		<>
			<Badge
				color={
					status === "open"
						? "red"
						: status === "closed"
						? "green"
						: status === "in progress"
						? "blue"
						: "blue"
				}
			>
				{status.toUpperCase()}
			</Badge>
		</>
	);
};

export default Issue_status_badge;
