import { SimpleGrid } from "@chakra-ui/react";

import { useNavigate, useSearchParams } from "react-router-dom";
import data from "../data/homepage.json";
import HomepageCard from "../features/HomepageCard";
import { Footer, Navigation } from "../layouts";
export default function Homepage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	return (
		<section className="bg-gray-700 min-h-screen">
			<Navigation />
			<main className="p-4  container mx-auto h-[calc(100vh - 120px)] overflow-y-auto">
				<header className="font-bold text-4xl text-gray-50">CSDT Tutorials</header>
				{/* <section className="border-4 border-dashed rounded-md ">
					{data &&
						data.map((tool) => (
							<>
								<h3 className="leading-4 text-3xl py-2 ">{tool?.title}</h3>
								<ul>
									{tool?.names &&
										tool?.names.map((tutorial) => (
											<li>
												<button onClick={() => setSearchParams("name=" + tutorial.slug)}> {tutorial?.name}</button>
											</li>
										))}
								</ul>
							</>
						))}
				</section> */}
				<section className="border-4 border-dashed rounded-md">
					<SimpleGrid columns={4}>{data && data.map((tool) => <HomepageCard {...tool} />)}</SimpleGrid>
				</section>
			</main>{" "}
			<Footer tool={"Tutorials"} />
		</section>
	);
}
