import { DarkMode, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";

import { FC, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Step } from "../../types";

interface DrawerProps {
	title: string;
	steps: Array<Step>;
	current: number;
	handleOnClick: (e: Step) => void;
}

const StepSelectionDrawer: FC<DrawerProps> = ({ title, steps, current, handleOnClick }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef(null);

	return (
		<DarkMode>
			<button
				className="text-white seventh-step ml-2 text-sm border border-gray-500  px-3 h-8 rounded-md leading-4 font-semibold hover:bg-gray-500 hover:bg-opacity-20 transition ease-linear duration-150"
				aria-label="Tutorial Step Selection"
				ref={btnRef}
				onClick={onOpen}>
				<FaBars />
			</button>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />

					<header className="text-2xl py-4 px-6 flex-0 font-semibold leading-9 overflow-auto text-white mr-4">
						{title} Steps
					</header>

					<div className="flex-1 overflow-auto py-2 px-6">
						{steps &&
							steps.map((step) => (
								<div
									key={step.title}
									className="flex text-center px-4 pl-4 py-3 cursor-pointer dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-900 hover:dark:text-gray-300 hover:text-gray-900 font-semibold transition ease-linear duration-150"
									onClick={() => {
										handleOnClick(step);
										onClose();
									}}>
									<span className={`${current === step.id && "text-blue-500 dark:text-blue-300"}`}>{step.title}</span>
								</div>
							))}
					</div>

					<footer className="py-4 px-6">
						<button
							className="w-full border border-gray-600 py-2 rounded-md font-medium hover:bg-gray-500 hover:bg-opacity-50 transition ease-linear text-white"
							onClick={onClose}>
							Close
						</button>
					</footer>
				</DrawerContent>
			</Drawer>
		</DarkMode>
	);
};
export default StepSelectionDrawer;
