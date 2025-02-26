import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Center, List, ListItem, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

type Props = {
	title: string;
	names: {
		name: string;
		slug: string;
	}[];
};

export default function HomepageCard({ title, names }: Props) {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<Center py={6}>
			<Box
				maxW="330px"
				w="full"
				bg={useColorModeValue("white", "gray.800")}
				boxShadow="xl"
				rounded="lg"
				overflow="hidden"
				transition="all 0.3s ease"
				_hover={{
					transform: "translateY(-5px)",
					boxShadow: "2xl",
				}}>
				<Stack textAlign="center" p={8} color={useColorModeValue("gray.800", "white")} align="center" spacing={4}>
					<Text fontSize="3xl" fontWeight={800} bgGradient="linear(to-r, teal.400, teal.600)" bgClip="text">
						{title || "CSDT"}
					</Text>
				</Stack>

				<Box
					bg={useColorModeValue("gray.50", "gray.900")}
					px={6}
					py={8}
					borderTop="1px"
					borderColor={useColorModeValue("gray.200", "gray.700")}>
					<List spacing={4}>
						{names?.map((tutorial) => (
							<ListItem key={tutorial.slug}>
								<Button
									rightIcon={<ArrowForwardIcon />}
									colorScheme="teal"
									variant="ghost"
									w="full"
									py={6}
									fontSize="lg"
									fontWeight="medium"
									_hover={{
										bg: "teal.50",
										color: "teal.600",
									}}
									onClick={() => setSearchParams("name=" + tutorial.slug)}>
									{tutorial.name}
								</Button>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</Center>
	);
}
