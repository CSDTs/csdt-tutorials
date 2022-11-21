import { SimpleGrid } from "@chakra-ui/react";

import data from "../data/homepage.json";
import HomepageCard from "../features/HomepageCard";
import { Footer, Navigation } from "../layouts";
export default function Homepage() {
	return (
		<section className="bg-gray-700 min-h-screen">
			<Navigation />
			<main className="p-4 h-main container mx-auto">
				<header className="mb-2 text-5xl leading-3 font-bold py-8">CSDT Tutorials</header>
				<section className="border-4 border-dashed rounded-md">
					<SimpleGrid columns={4}>{data && data.map((tool) => <HomepageCard {...tool} />)}</SimpleGrid>
				</section>
			</main>{" "}
			<Footer tool={"Tutorials"} />
		</section>
	);
}
