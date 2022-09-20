import { Box, Button, Flex, Heading, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NextSteps({ nextSteps, outcome, background, software }) {
	const navigate = useNavigate();
	return (
		<Flex minH={"80vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<Heading>Congratulations!</Heading>
						<Text>
							{nextSteps ||
								"You completed the tutorial. You are now ready to move on to the simulation where you create your own designs!"}
						</Text>
						<Stack spacing={5}>
							<Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
								{background && (
									<Button
										onClick={() => {
											window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + background;
										}}
										w={{ base: "100%", sm: "50%" }}>
										Review the background
									</Button>
								)}
								<Button
									onClick={() => {
										navigate("/");
									}}
									w={{ base: "100%", sm: "50%" }}>
									Try another tutorial
								</Button>
							</Stack>
							{software && (
								<Button
									bg={"blue.400"}
									color={"white"}
									onClick={() => {
										window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + software;
									}}
									_hover={{
										bg: "blue.500",
									}}>
									Jump into the software
								</Button>
							)}
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
		// <Box minH={"80vh"} justifyContent={"center"}>
		// 	<Heading>Congratulations!</Heading>
		// 	<Text>
		// 		{blurb ||
		// 			"You completed the tutorial. You are now ready to move on to the simulation where you create your own designs!"}
		// 	</Text>
		// 	<Button>Review the background information</Button>
		// 	<Button>Jump into the software</Button>
		// 	<Button>Try another tutorial</Button>
		// </Box>
		// </Flex>
	);
}
