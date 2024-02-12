// React
import { Suspense } from "react";

// NextJS
import Link from "next/link";
import { revalidatePath } from "next/cache";

// Radix
import { Button } from "@radix-ui/themes";

// Components
import Issues_toolbar from "./components/issues_toolbal/issues_toolbar";
import Issues_table from "./components/issues_table/issues_table";
import Loading_skeleton from "./loading_skeleton";

// Css
import "./styles.css";

const Page = () => {
	return (
		<>
			<div className="page_content space-y-2">
				<Suspense fallback={<Loading_skeleton />}>
					<Issues_toolbar />
					<Issues_table />
				</Suspense>
			</div>
		</>
	);
};

export const dynamic = "force-dynamic"; // defaults to auto
export const revalidate = 0;
export default Page;
