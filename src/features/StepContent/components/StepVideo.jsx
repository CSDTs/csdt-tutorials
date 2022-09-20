import { AspectRatio, Box, chakra } from "@chakra-ui/react";

export default function StepVideo({ url }) {
	return (
		<Box w="100%">
			<chakra.video src={"assets/" + url} controls w="100%"></chakra.video>
		</Box>
	);
}
