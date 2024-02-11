import { Flex, Heading, Card } from "@radix-ui/themes";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading_skeleton = () => {
	return (
		<>
			<div className="page_content">
				<ul>
					<Flex gap="1" direction="column">
						<Heading>
							<Skeleton width="200px" />
						</Heading>
						<Flex gap="3">
							{/* <Issue_status_badge status={issue.status} /> */}
							<Skeleton width="30px" />
							<Skeleton width="230px" />
							<li>
								<Skeleton />
							</li>
						</Flex>
						<Card className="max-w-96 mt-2">
							<Skeleton />
						</Card>
					</Flex>
				</ul>
			</div>
		</>
	);
};

export default Loading_skeleton;
