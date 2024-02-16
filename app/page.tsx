import Pagination from "./global.components/pagination/pagination";

interface Props {
	searchParams: {
		page: string;
	};
}

export default function Home(Props: Props) {
	return (
		<>
			<Pagination
				items_count={101}
				curent_page={parseInt(Props.searchParams.page)}
				page_size={20}
			/>
		</>
	);
}
