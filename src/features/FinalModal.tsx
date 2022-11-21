import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
} from "@chakra-ui/react";

interface ModalProps {
	isOpen: boolean;
	onOpen?: () => null;
	onClose: () => null;
	nextSteps?: string;
	outcome?: string;
	background?: string;
	software?: string;
}

import { FC } from "react";

import { useNavigate } from "react-router-dom";
const FinalModal: FC<ModalProps> = ({ isOpen, onOpen, onClose, nextSteps, outcome, background, software }) => {
	const navigate = useNavigate();

	const launchTutorials = () => {
		if (import.meta.env.PROD) {
			window.location.href = "/static/tutorials/index.html";
		} else {
			navigate("/");
		}
	};

	const launchBackground = () => {
		window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + background;
	};

	const launchSoftware = () => {
		window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + software;
	};
	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Congratulations!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<p className="mb-5 mt-2">
								{nextSteps ||
									"You completed the tutorial. You are now ready to move on to the simulation where you create your own designs!"}
							</p>
							<Stack spacing={5}>
								<Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
									{background && (
										<Button onClick={launchBackground} w={{ base: "100%", sm: "50%" }}>
											Review the background
										</Button>
									)}
									<Button onClick={launchTutorials} w={{ base: "100%", sm: "50%" }}>
										Try another tutorial
									</Button>
								</Stack>
								{software && (
									<Button
										bg={"blue.400"}
										color={"white"}
										onClick={launchSoftware}
										_hover={{
											bg: "blue.500",
										}}>
										Jump into the software
									</Button>
								)}
							</Stack>
						</Stack>
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</>
	);
};

export default FinalModal;
