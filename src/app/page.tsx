import Converter from "@/layouts/Converter";
import Header from "@/layouts/Header";
import Tabs from "@/layouts/Tabs";

export default function HomePage() {
	return (
		<main>
			<Header />
			<Converter />
			<Tabs />
		</main>
	);
}
