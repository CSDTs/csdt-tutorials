import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { TourProvider } from "@reactour/tour";
import { useState } from "react";
import { StepDescription, StepVideo } from "../../features/StepContent";
import { StepNavigation, StepProgressBar } from "../../features/StepProgression";

export default function SidebarContent(props) {
	const { info, step, setStep, available, ...styles } = props;

	const [currentActive, setCurrentActive] = useState(0);

	return (
		<Box
			as="nav"
			pos="fixed"
			top="0"
			left="0"
			// zIndex="sticky"
			h="full"
			px="8"
			pt="5"
			pb="10"
			overflowX="hidden"
			overflowY="auto"
			bg="brand.600"
			borderColor="blackAlpha.300"
			borderRightWidth="1px"
			w={96}
			transition=".3s ease"
			zIndex={"auto"}
			{...styles}>
			<Box py="5">
				<Heading size={"md"}>{info?.tutorial_title}</Heading>
			</Box>

			{available && available.length > 0 && (
				<StepProgressBar
					current={{
						get: () => {
							return currentActive;
						},
						set: (val) => {
							setCurrentActive(val.id);
							setStep(val);
						},
					}}
					available={available}
				/>
			)}
			<Stack direction="column" justifyContent="space-between" spacing={96}>
				<Flex direction="column" fontSize="sm" color="teal" aria-label="Main Navigation">
					{step?.description && <StepDescription description={step?.description} short={step?.short} />}

					{step?.video && <StepVideo url={info?.prefix + step?.video} />}

					{step?.outcome && <Image src={"assets/" + info?.prefix + step?.outcome} />}
				</Flex>
			</Stack>
			{available && available.length > 0 && (
				<StepNavigation
					current={{
						get: () => {
							return currentActive;
						},
						set: (val) => {
							setCurrentActive(val);
							setStep(available[val]);
						},
					}}
					available={available}
				/>
			)}
		</Box>
	);
}
