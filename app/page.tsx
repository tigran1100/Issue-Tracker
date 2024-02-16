import Pagination from "./global.components/pagination/pagination";

export default function Home() {
	return (
		<>
			<Pagination items_count={101} curent_page={5} page_size={20} />
		</>
	);
}
