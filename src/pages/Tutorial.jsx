import {
	Box,
	Button,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Heading,
	SlideFade,
	useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CSnap } from "../features/StepContent";

import { useEffect, useState } from "react";

import { TourProvider, useTour } from "@reactour/tour";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import FinalModal from "../features/FinalModal";
import FirstTimeModal from "../features/FirstTimeModal";
import SettingsButton from "../features/SettingsButton";
import StepSelection from "../features/StepSelection";
import StepSelectionDrawer from "../features/StepSelectionDrawer";
import { Footer, Navigation, SidebarContent } from "../layouts";
import Sidebar from "../layouts/Sidebar";
import FetchService from "../services/fetch.service";
export default function Tutorial({ name }) {
	const sidebar = useDisclosure();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { info, data, isLoading } = FetchService.selectSet(name);

	const [availableSteps, setAvailableSteps] = useState(null);

	const [currentStep, setCurrentStep] = useState(null);

	const [base, setBase] = useState(null);

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
		if (currentStep?.id == availableSteps?.length - 1) onOpen();

		if (currentStep?.explanation) {
			fetch(`assets/${info?.prefix}${currentStep?.explanation}`)
				.then((response) => response.text())
				.then((text) => setGui({ ...gui, longDescription: text }))
				.catch((error) => console.error(error));
		} else {
			setGui({ ...gui, longDescription: "text" });
		}
	}, [currentStep]);

	const [gui, setGui] = useState({
		toggleWidth: false,
		isCodeShown: false,
		isLongDescriptionShown: false,
		longDescription: "",
	});

	return (
		<>
			<FirstTimeModal startWalkThrough={setIsOpen} />

			{currentStep?.id == availableSteps?.length - 1 && (
				<FinalModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} {...currentStep} />
			)}
			<section className={`bg-gray-50 dark:bg-gray-700 min-h-screen first-step final-step`}>
				<Sidebar
					info={info}
					step={currentStep}
					setStep={setCurrentStep}
					available={availableSteps}
					isCodeShown={gui.isCodeShown}
					toggleWidth={gui.toggleWidth}
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
							isCodeShown={gui.isCodeShown}
						/>
					</DrawerContent>
				</Drawer>
				<section
					className={`${gui.toggleWidth && "w-2/3 md:ml-auto "} ${
						!gui.toggleWidth && "md:ml-96 w-full"
					}transition-all duration-300 ease-linear flex flex-col flex-grow min-h-screen `}>
					<Navigation />

					<main className="p-4 h-full transition-all duration-300 ease-in-out w-full">
						<section className="flex justify-between my-2 py-2 items-center">
							<header className="font-bold text-3xl">{currentStep?.title}</header>
							<div className="flex">
								<SettingsButton ide={ide} info={info} gui={gui} setGui={setGui} startWalkThrough={setIsOpen} />

								<StepSelectionDrawer
									title={info?.tutorial_title}
									steps={availableSteps}
									current={currentStep?.id}
									handleOnClick={setCurrentStep}
								/>

								<Button
									colorScheme="teal"
									onClick={sidebar.onOpen}
									display={{
										base: "block",
										md: "none",
									}}>
									Open
								</Button>
							</div>
						</section>

						{currentStep?.id < availableSteps?.length && base && (
							<div
								className={`${gui.isLongDescriptionShown && "h-csnap-text overflow-y-scroll"} ${
									!gui.isLongDescriptionShown && "h-csnap-normal overflow-y-scroll md:h-csnap-normal-md"
								} transition-all ease-out duration-500`}>
								<CSnap
									base={base}
									coreList={info?.core}
									whitelist={currentStep?.whitelist}
									modifiers={currentStep?.modifiers}
									globalModifiers={info?.globalModifiers}
									ide={ide}
									setIde={setIde}
									legacy={info?.legacy}
								/>
							</div>
						)}

						{gui.isLongDescriptionShown && (
							<SlideFade in={gui.isLongDescriptionShown} offsetY="20px">
								<Box
									py="30px"
									px={"40px"}
									color="white"
									mt="4"
									bg="gray.800"
									rounded="md"
									shadow="md"
									maxH={{ base: "35vh", md: "25vh" }}>
									<Heading size={{ base: "lg", md: "md" }} mb={3}>
										Step Description
									</Heading>
									<Box maxH={{ base: "20vh", md: "15vh" }} overflowY={"scroll"}>
										<ReactMarkdown components={ChakraUIRenderer()} children={gui.longDescription} skipHtml />
									</Box>
								</Box>{" "}
							</SlideFade>
						)}

						{/* {!gui.isLongDescriptionShown && (
						<div className="py-3 w-full bg-slate-900 rounded-md px-5 inline-flex justify-between items-center my-auto md:py-1">
							<p className="font-bold text-3xl md:text-xl">Step Description</p>
							<span className="bg-slate-700 py-1 px-4 rounded-lg font-medium">More </span>
						</div>
					)} */}
					</main>

					<Footer tool={info?.tool} />
				</section>
			</section>
		</>
	);
}
