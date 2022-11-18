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
	SlideFade,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CSnap, LegacyCSnap } from "../features/StepContent";

import { useEffect, useState } from "react";

import { TourProvider, useTour } from "@reactour/tour";
import { Parser } from "html-to-react";
import Draggable from "react-draggable";
import { FaCog } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import NextSteps from "../features/NextSteps";
import { Footer, Navigation, SidebarContent } from "../layouts";

import { ChevronDownIcon } from "@chakra-ui/icons";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import FinalModal from "../features/FinalModal";
import FirstTimeModal from "../features/FirstTimeModal";
import StepSelectionDrawer from "../features/StepSelectionDrawer";
import FetchService from "../services/fetch.service";
export default function Tutorial({ name }) {
	const sidebar = useDisclosure();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const { info, data, isLoading } = FetchService.selectSet(name);

	const [availableSteps, setAvailableSteps] = useState(null);

	const [currentStep, setCurrentStep] = useState(null);

	const [base, setBase] = useState(null);

	const [width, setWidth] = useState(96);
	const [ide, setIde] = useState(null);
	const [isCodeShown, setIsCodeShown] = useState(false);
	const [isLongDescriptionShown, setIsLongDescriptionShown] = useState(false);

	const [longDescription, setLongDescription] = useState("");
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

	useEffect(() => {
		if (currentStep?.id == availableSteps?.length - 1) onOpen();

		if (currentStep?.explanation) {
			console.log("yeet");
			fetch(`assets/${info?.prefix}${currentStep?.explanation}`)
				.then((response) => response.text())
				.then((text) => setLongDescription(text))
				.catch((error) => console.error(error));
		} else {
			setLongDescription("");
		}
	}, [currentStep]);

	useEffect(() => {
		console.log("long", longDescription);
	}, [longDescription]);
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
				isCodeShown={isCodeShown}
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
						isCodeShown={isCodeShown}
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
					<Flex>
						<Box w={"100%"}>
							<Heading mb={2} size="lg" w={"100%"}>
								{currentStep?.title}{" "}
							</Heading>
						</Box>

						<FirstTimeModal fireWalkthrough={setIsOpen} />
						<Menu closeOnSelect={false}>
							<MenuButton
								leftIcon={<FaCog />}
								rightIcon={<ChevronDownIcon />}
								as={Button}
								colorScheme="gray"
								className=" sixth-step"
								size={"sm"}>
								Settings
							</MenuButton>
							<MenuList minWidth="240px" fontSize={"sm"}>
								<MenuOptionGroup title="Tutorial" type="checkbox">
									<MenuItemOption value="toggleSplitScreen" onClick={() => setWidth(width == 96 ? "40rem" : 96)}>
										Toggle Split Screen View
									</MenuItemOption>
									<MenuItemOption value="toggleDarkMode" onClick={toggleColorMode}>
										Toggle Dark Mode
									</MenuItemOption>
								</MenuOptionGroup>

								{!info?.legacy && (
									<>
										<MenuDivider />
										<MenuOptionGroup title="CSnap" type="checkbox">
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
									</>
								)}

								<MenuDivider />
								<MenuOptionGroup title="Help" type="checkbox">
									<MenuItemOption value="codeShown" onClick={() => setIsCodeShown(!isCodeShown)}>
										{isCodeShown ? "Hide" : "Show"} finished step code
									</MenuItemOption>{" "}
									<MenuItemOption
										value="descriptionShown"
										onClick={() => setIsLongDescriptionShown(!isLongDescriptionShown)}
										isDisabled={!longDescription}>
										{isLongDescriptionShown ? "Hide" : "Show"} long description
									</MenuItemOption>
								</MenuOptionGroup>
								{/* <MenuOptionGroup title="Debug" type="checkbox">
									<MenuItemOption value="fetchBlocks" onClick={() => console.log(ide.fetchBlockList())}>
										Fetch Blocks
									</MenuItemOption>
									<MenuItemOption value="hideGoTo" onClick={() => ide.hideBlock()}>
										Hide Go To Block
									</MenuItemOption>
								</MenuOptionGroup> */}
							</MenuList>
						</Menu>
						<StepSelectionDrawer
							title={info?.tutorial_title}
							steps={availableSteps}
							current={currentStep?.id}
							handleOnClick={setCurrentStep}
						/>
					</Flex>

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
					{currentStep?.id == availableSteps?.length - 1 && (
						<FinalModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} {...currentStep} />
					)}

					{currentStep?.id < availableSteps?.length && base && !info?.legacy && (
						<div
							className={`${
								isLongDescriptionShown && "h-50vh overflow-y-scroll"
							}  transition-all ease-out duration-500`}>
							<CSnap
								base={base}
								coreList={info?.core}
								whitelist={currentStep?.whitelist}
								modifiers={currentStep?.modifiers}
								globalModifiers={info?.globalModifiers}
								ide={ide}
								setIde={setIde}
							/>
						</div>
					)}
					{currentStep?.id < availableSteps?.length - 1 && base && info?.legacy && (
						<LegacyCSnap
							base={base}
							coreList={info?.core}
							module={info?.module}
							whitelist={currentStep?.whitelist}
							modifiers={currentStep?.modifiers}
							globalModifiers={info?.globalModifiers}
							ide={ide}
							setIde={setIde}
						/>
					)}
					{isLongDescriptionShown && (
						<SlideFade in={isLongDescriptionShown} offsetY="20px">
							<Box py="30px" px={"40px"} color="white" mt="4" bg="gray.800" rounded="md" shadow="md" maxH={"35vh"}>
								<Heading size={"lg"} mb={3}>
									Step Description
								</Heading>
								<Box maxH={{ base: "20vh", md: "25vh" }} overflowY={"scroll"}>
									<ReactMarkdown components={ChakraUIRenderer()} children={longDescription} skipHtml />
								</Box>
							</Box>{" "}
						</SlideFade>
					)}
				</Box>

				<Footer tool={info?.tool} />
			</Box>
		</Box>
	);
}
