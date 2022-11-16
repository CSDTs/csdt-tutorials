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
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Progress,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import { CSnap } from "./features/StepContent";

import { useEffect, useState } from "react";

import { TourProvider, useTour } from "@reactour/tour";
import Draggable from "react-draggable";
import { FaCog } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import "./App.css";
import NextSteps from "./features/NextSteps";
import { Footer, Navigation, SidebarContent } from "./layouts";
import Homepage from "./pages/Homepage";
import Tutorial from "./pages/Tutorial";

import FetchService from "./services/fetch.service";

function App() {
	const sidebar = useDisclosure();

	const [searchParams, setSearchParams] = useSearchParams();

	const { info, data, isLoading } = FetchService.selectSet(searchParams.get("name"));

	const [availableSteps, setAvailableSteps] = useState(null);

	const [currentStep, setCurrentStep] = useState(null);

	const [base, setBase] = useState(null);

	const [width, setWidth] = useState(96);
	const [ide, setIde] = useState(null);

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

	if (searchParams.get("type") && searchParams.get("name")) return <Tutorial3d name={searchParams.get("name")} />;

	return <>{searchParams.get("name") ? <Tutorial name={searchParams.get("name")} /> : <Homepage />}</>;
}

export default App;
