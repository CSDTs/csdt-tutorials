import { AspectRatio, Box } from "@chakra-ui/react";

export default function StepVideo({ url }) {
	return (
		<Box w="100%">
			<video src={"assets/" + url} controls></video>
		</Box>
	);
}
