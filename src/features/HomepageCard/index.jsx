import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Image, List, ListIcon, ListItem, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function HomepageCard({ title, names }) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	return (
		<Center py={6}>
			<Box
				maxW={"330px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"md"}
				overflow={"hidden"}>
				<Stack textAlign={"center"} p={6} color={useColorModeValue("gray.800", "white")} align={"center"}>
					<Stack direction={"row"} align={"center"} justify={"center"}>
						<Text fontSize={"2xl"} fontWeight={800}>
							{title || "CSDT"}
						</Text>
					</Stack>
					{/* <Image
						src={
							"https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80"
						}
					/> */}
				</Stack>

				<Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
					<List spacing={3}>
						{names &&
							names.map((tutorial) => (
								<ListItem>
									<Button
										rightIcon={<ArrowForwardIcon />}
										colorScheme="teal"
										variant="link"
										w={"100%"}
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
