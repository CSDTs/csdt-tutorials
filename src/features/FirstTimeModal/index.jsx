import {
	Button,
	Checkbox,
	FormControl,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function FirstTimeModal({ fireWalkthrough }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		// if (!localStorage.getItem("tutorialFirst")) {
		onOpen();
		// }
	}, []);

	return (
		<>
			{/* <Button onClick={onOpen}>Trigger modal</Button> */}

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Welcome to the Tutorial</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Want to take the tour of the layout?</Text>

						{/* <FormControl mt={4}>
							<Checkbox>Remember my choice for later</Checkbox>
						</FormControl> */}
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} mx={2} variant="ghost">
							No, maybe later
						</Button>
						<Button
							onClick={() => {
								onClose();
								fireWalkthrough(true);
							}}
							colorScheme={"green"}>
							Yes, let's do it
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
