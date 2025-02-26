import { Box } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import data from "../../data/homepage.json";
import { Footer } from "../layout/footer";
import { NavBar } from "../layout/navbar";
import HomepageCard from "../misc/homepage-card";

export default function Homepage() {
	const breakpointColumns = {
		default: 3,
		1100: 2,
		700: 1,
	};

	return (
		<section className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col">
			<NavBar />
			<main className="container mx-auto px-4 py-12 flex-1">
				<Box textAlign="center" mb={12}>
					<header className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600 mb-4">
						CSDT Tutorials
					</header>
					<p className="text-gray-300 text-lg">Choose a tutorial below to get started with CSDTs</p>
				</Box>

				<Box p={8} rounded="xl" bg="rgba(255,255,255,0.05)" backdropFilter="blur(10px)" boxShadow="xl">
					<Masonry
						breakpointCols={breakpointColumns}
						className="flex -ml-8 w-auto"
						columnClassName="pl-8 bg-clip-padding">
						{data &&
							data.map((tool) => (
								<Box key={tool.title} mb={8} transition="all 0.3s" _hover={{ transform: "translateY(-4px)" }}>
									<HomepageCard {...tool} />
								</Box>
							))}
					</Masonry>
				</Box>
			</main>
			<Footer tool={"Tutorials"} />
		</section>
	);
}
