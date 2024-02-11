// React
import { Suspense } from "react";

// NextJS
import Link from "next/link";

// Radix
import { Button } from "@radix-ui/themes";

// Components
import Issues_toolbar from "./components/issues_toolbal/issues_toolbar";
import Issues_table from "./components/issues_table/issues_table";

// Css
import "./styles.css";

const Page = () => {
	return (
		<>
			<div className="page_content space-y-2">
				<Issues_toolbar />
				<Issues_table />
			</div>
		</>
	);
};

export default Page;
