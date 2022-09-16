import {
	Box,
	Button,
	ButtonGroup,
	chakra,
	Drawer,
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

import "./App.css";

import { Footer, Navigation, SidebarContent } from "./layouts";

function App() {
	const sidebar = useDisclosure();

	const { name } = useParams();
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

	return (
		<Box
			as="section"
			bg="gray.50"
			_dark={{
				bg: "gray.700",
			}}
			minH="100vh">
			<SidebarContent
				display={{
					base: "none",
					md: "unset",
				}}
				info={info}
				step={currentStep}
				setStep={setCurrentStep}
				available={availableSteps}
			/>
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent>
					<SidebarContent
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

					{base && <CSnap base={base} whitelist={currentStep?.whitelist} />}
				</Box>
				<Footer tool={info?.tool} />
			</Box>
		</Box>
	);
}

export default App;
