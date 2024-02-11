// Radix UI
import { Badge, Button, Table } from "@radix-ui/themes";

// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
	const issues = [0, 1, 2, 3];

	return (
		<>
			<div className="!mt-0 space-y-2">
				<Button className="block">
					<div className="opacity-0 h-0">New Issue</div>
				</Button>
				<Table.Root variant="surface">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeaderCell>
								Issue
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell className="hidden sm:table-cell">
								Status
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell className="hidden sm:table-cell">
								Created
							</Table.ColumnHeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{issues?.map((issue, index) => (
							<Table.Row
								key={"a1d127" + index}
								className="cursor-pointer hover:bg-slate-100 transition-all"
							>
								<Table.RowHeaderCell className="text-center sm:text-start">
									<Skeleton />
								</Table.RowHeaderCell>
								<Table.Cell className="hidden sm:table-cell">
									<Skeleton />
								</Table.Cell>
								<Table.Cell className="hidden sm:table-cell">
									<Skeleton />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</div>
		</>
	);
};

export default Loading;
