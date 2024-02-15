// NextJS
import Link from "next/link";
import { revalidatePath } from "next/cache";
import dynamic from "next/dynamic";

// React
import { Suspense } from "react";

// Radix
import { Button } from "@radix-ui/themes";

// Components
import Issues_toolbar from "./components/issues_toolbal/issues_toolbar";
import Issues_table from "./components/issues_table/issues_table";
import Loading_skeleton from "./loading_skeleton";

// Css
import "./styles.css";

const Page = (Props: any) => {
	return (
		<>
			<div className="page_content space-y-2">
				<Suspense fallback={<Loading_skeleton />}>
					<Issues_toolbar />
					<Issues_table parent_props={Props} />
				</Suspense>
			</div>
		</>
	);
};

// export const dynamic = "force-dynamic"; // defaults to auto
export const revalidate = 0;
export default Page;
