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
import { useParams } from "react-router-dom";
import "./App.css";
import NextSteps from "./features/NextSteps";
import { Footer, Navigation, SidebarContent } from "./layouts";
import FetchService from "./services/fetch.service";

function App() {
	const sidebar = useDisclosure();

	const { name } = useParams();
	console.log(name);
	const { info, data, isLoading } = FetchService.selectSet(name);

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

	return (
		<>
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
					w={width}
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
						md: width,
					}}
					transition=".3s ease"
					display={"flex"}
					flexDirection="column"
					flexGrow={"1"}
					minH="100vh">
					<Navigation />

					<Box as="main" p="4">
						<Heading mb={2} size="lg">
							{currentStep?.title}{" "}
							<Menu closeOnSelect={false}>
								<MenuButton as={Button} colorScheme="blue" className=" sixth-step" size={"sm"}>
									<FaCog />
								</MenuButton>
								<MenuList minWidth="240px" fontSize={"sm"}>
									<MenuOptionGroup title="Toggles" type="checkbox">
										<MenuItemOption value="singlePalette" onClick={() => ide.toggleSinglePalette()}>
											Toggle Single Palette
										</MenuItemOption>
										<MenuItemOption value="corralBar" onClick={() => ide.toggleCorralBar()}>
											Toggle Corral Bar
										</MenuItemOption>
										<MenuItemOption value="tabs" onClick={() => ide.toggleTabs()}>
											Toggle Tabs
										</MenuItemOption>
										<MenuItemOption value="spriteBar" onClick={() => ide.toggleSpriteBar()}>
											Toggle Sprite Bar
										</MenuItemOption>
									</MenuOptionGroup>
									<MenuDivider />
									<MenuOptionGroup title="Debug" type="checkbox">
										<MenuItemOption value="fetchBlocks" onClick={() => console.log(ide.fetchBlockList())}>
											Fetch Blocks
										</MenuItemOption>
										<MenuItemOption value="hideGoTo" onClick={() => ide.hideBlock()}>
											Hide Go To Block
										</MenuItemOption>
										<MenuItemOption value="toggleSplitScreen" onClick={() => setWidth(width == 96 ? "40rem" : 96)}>
											Toggle Split Screen
										</MenuItemOption>
									</MenuOptionGroup>
								</MenuList>
							</Menu>
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
						{currentStep?.id == availableSteps?.length - 1 && <NextSteps {...currentStep} />}

						{currentStep?.id < availableSteps?.length - 1 && base && (
							<CSnap
								base={base}
								coreList={info?.core}
								whitelist={currentStep?.whitelist}
								modifiers={currentStep?.modifiers}
								globalModifiers={info?.globalModifiers}
								ide={ide}
								setIde={setIde}
							/>
						)}
					</Box>
					<Footer tool={info?.tool} />
				</Box>
			</Box>
		</>
	);
}

export default App;
