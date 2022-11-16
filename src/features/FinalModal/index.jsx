import {
	Button,
	Checkbox,
	FormControl,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function FinalModal({ isOpen, onOpen, onClose, nextSteps, outcome, background, software }) {
	return (
		<>
			{/* <Button onClick={onOpen}>Trigger modal</Button> */}

			<Modal onClose={onClose} isOpen={isOpen} size={"3xl"} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Congratulations!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<Text>
								{nextSteps ||
									"You completed the tutorial. You are now ready to move on to the simulation where you create your own designs!"}
							</Text>
							<Stack spacing={5}>
								<Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
									{background && (
										<Button
											onClick={() => {
												window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + background;
											}}
											w={{ base: "100%", sm: "50%" }}>
											Review the background
										</Button>
									)}
									<Button
										onClick={() => {
											if (import.meta.env.PROD) {
												window.location.href = "/static/tutorials/index.html";
											} else {
												navigate("/");
											}
										}}
										w={{ base: "100%", sm: "50%" }}>
										Try another tutorial
									</Button>
								</Stack>
								{software && (
									<Button
										bg={"blue.400"}
										color={"white"}
										onClick={() => {
											window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + software;
										}}
										_hover={{
											bg: "blue.500",
										}}>
										Jump into the software
									</Button>
								)}
							</Stack>
						</Stack>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
