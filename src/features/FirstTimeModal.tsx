import {
	Button,
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
import { FC, useEffect, useRef } from "react";

interface ModalProps {
	startWalkThrough: (e: boolean) => null;
}
const FirstTimeModal: FC<ModalProps> = ({ startWalkThrough }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const doNotAsk = useRef<HTMLInputElement>(null);

	const accept = () => {
		localStorage.setItem("walkThroughPrompt", JSON.stringify(doNotAsk.current?.checked || false));
		onClose();
		startWalkThrough(true);
	};

	const reject = () => {
		localStorage.setItem("walkThroughPrompt", JSON.stringify(doNotAsk.current?.checked || false));
		onClose();
	};
	useEffect(() => {
		if (localStorage.getItem("walkThroughPrompt") === "true") return;

		onOpen();
	}, []);

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Welcome to the Tutorial</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Want to take the tour of the layout?</Text>

						<div className="flex items-start mt-5">
							<div className="flex h-5 items-center">
								<input
									id="comments"
									name="comments"
									type="checkbox"
									ref={doNotAsk}
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="comments" className="font-medium text-gray-300">
									Don't ask again (You can still access it in Settings)
								</label>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onClick={reject} mx={2} variant="ghost">
							No thanks
						</Button>
						<Button onClick={accept} colorScheme={"green"}>
							Yes, let's do it
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default FirstTimeModal;
