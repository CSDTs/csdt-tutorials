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
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";

import { CSnap } from "./features/StepContent";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FetchService from "./services/fetch.service";

import { TourProvider, useTour } from "@reactour/tour";
import "./App.css";
import { Footer, Navigation, SidebarContent } from "./layouts";

function App() {
	const sidebar = useDisclosure();

	const { name } = useParams();
	console.log(name);
	const { info, data, isLoading } = FetchService.selectSet(name);

	const [availableSteps, setAvailableSteps] = useState(null);

	const [currentStep, setCurrentStep] = useState(null);

	const [base, setBase] = useState(null);

	useEffect(() => {
		if (data) {
			let temp = data.slice(1).map((lesson, i) => ({ ...lesson, id: i }));
			setAvailableSteps(temp);
			setCurrentStep(temp[0]);
			setBase(info.prefix + info.base);
		}
	}, [data]);
	const { setIsOpen } = useTour();
	useEffect(() => {
		// setIsOpen(true);

		console.log(info);
	}, [info]);

	return (
		<Box
			as="section"
			bg="gray.50"
			_dark={{
				bg: "gray.700",
			}}
			minH="100vh"
			className="first-step final-step">
			<SidebarContent
				display={{
					base: "none",
					md: "flex",
				}}
				flexDirection="column"
				info={info}
				step={currentStep}
				setStep={setCurrentStep}
				available={availableSteps}
				className="second-step"
			/>
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" zIndex={"auto"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton zIndex={1} />
					<SidebarContent
						display={{
							base: "flex",
						}}
						flexDirection="column"
						w="full"
						borderRight="none"
						info={info}
						step={currentStep}
						setStep={setCurrentStep}
						available={availableSteps}
					/>
				</DrawerContent>
			</Drawer>
			<Box
				ml={{
					base: 0,
					md: 96,
				}}
				transition=".3s ease">
				<Navigation />

				<Box as="main" p="4">
					<Heading mb={2} size="lg">
						{currentStep?.title}
					</Heading>
					{/* <button onClick={() => setIsOpen(true)}>Open Tour</button>{" "} */}
					<Button
						colorScheme="teal"
						onClick={sidebar.onOpen}
						display={{
							base: "block",
							md: "none",
						}}>
						Open
					</Button>
					{base && (
						<CSnap
							base={base}
							coreList={info?.core}
							whitelist={currentStep?.whitelist}
							modifiers={currentStep?.modifiers}
							globalModifiers={info?.globalModifiers}
						/>
					)}
				</Box>
				<Footer tool={info?.tool} />
			</Box>
		</Box>
	);
}

export default App;
