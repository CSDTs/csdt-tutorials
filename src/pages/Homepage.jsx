import {
	Box,
	Button,
	ButtonGroup,
	chakra,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Heading,
	Progress,
	SimpleGrid,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import data from "../data/homepage.json";
import HomepageCard from "../features/HomepageCard";
import { Footer, Navigation } from "../layouts";
export default function Homepage() {
	return (
		<Box
			as="section"
			bg="gray.50"
			_dark={{
				bg: "gray.700",
			}}
			minH="100vh">
			<Box transition=".3s ease">
				<Navigation />

				<Box as="main" p="4">
					<Heading mb={2} size="lg">
						CSDT Tutorials
					</Heading>
					<Box borderWidth="4px" borderStyle="dashed" rounded="md" className=" fifth-step">
						<SimpleGrid columns={4}>{data && data.map((tool) => <HomepageCard {...tool} />)}</SimpleGrid>
					</Box>
					<Footer tool={"Tutorials"} />
				</Box>
			</Box>
		</Box>
	);
}
