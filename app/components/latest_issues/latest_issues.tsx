import Issue_status_badge from "@/app/global.components/issue_status_badge/issue_status_badge";
import Link_element from "@/app/global.components/link/link";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";

const Latest_issues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: {
			created_at: "desc",
		},
		take: 5,
		include: {
			assigned_to_user: true,
		},
	});
	return (
		<>
			{issues && Object.keys(issues).length > 0 && (
				<Card variant="ghost">
					<Heading className="text-center !mb-8">
						Latest assigned issues
					</Heading>
					<Table.Root variant="surface">
						<Table.Body>
							{issues.map((issue, index) => {
								return (
									<Table.Row key={68451 + index}>
										<Table.RowHeaderCell>
											<Flex justify="between">
												<Flex
													direction="column"
													gap="1"
												>
													<Text size="2">
														<Link_element
															href={`/issues/${issue.id}`}
														>
															{issue.title}
														</Link_element>
													</Text>
													<Text>
														<Issue_status_badge
															status={
																issue.status
															}
														/>
													</Text>
												</Flex>
												<Flex>
													{issue.assigned_to_user
														?.image && (
														<Avatar
															fallback="?"
															src={
																issue
																	.assigned_to_user
																	?.image
															}
															size="2"
															radius="full"
														></Avatar>
													)}
												</Flex>
											</Flex>
										</Table.RowHeaderCell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table.Root>
				</Card>
			)}
		</>
	);
};

export default Latest_issues;
