import { AspectRatio, Box, chakra, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function StepVideo({ url }) {
	const prefix = "assets/";
	const plyrProps = {
		options: {
			controls: [
				"play-large",
				"play",
				"progress",
				"current-time",
				"mute",
				"volume",
				// "captions",
				"settings",
				// "pip",
				// "airplay",
				"fullscreen",
			],
		},
		source: {
			type: "video",

			sources: [
				{
					src: prefix + url,
					type: "video/mp4",
				},
			],
		},
	};

	return (
		<>
			{/* <Box w="100%">
				<Plyr {...plyrProps}></Plyr>
			</Box>{" "} */}

			<Plyr
				options={{
					controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "settings", "fullscreen"],
				}}
				source={{
					type: "video",

					sources: [
						{
							src: prefix + url,
							type: "video/mp4",
						},
					],
				}}
			/>
		</>
	);
}
