import { AspectRatio } from "@chakra-ui/react";

export default function StepVideo({ url }) {
	return (
		<AspectRatio maxW="400px" ratio={4 / 3}>
			<video src={"assets/" + url} controls></video>
		</AspectRatio>
	);
}
