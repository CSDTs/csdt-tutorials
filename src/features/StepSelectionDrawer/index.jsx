import {
	Button,
	chakra,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Input,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";

const NavItem = (props) => {
	const { icon, children, ...rest } = props;
	return (
		<Flex
			align="center"
			px="4"
			pl="4"
			py="3"
			cursor="pointer"
			color="inherit"
			_dark={{
				color: "gray.400",
			}}
			_hover={{
				bg: "gray.100",
				_dark: {
					bg: "gray.900",
				},
				color: "gray.900",
			}}
			role="group"
			fontWeight="semibold"
			transition=".15s ease"
			{...rest}>
			{children}
		</Flex>
	);
};

export default function StepSelectionDrawer({ title, steps, current, handleOnClick }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	console.log(steps);

	return (
		<>
			<Button
				ref={btnRef}
				colorScheme="gray"
				variant="outline"
				onClick={onOpen}
				size={"sm"}
				ml={2}
				className="seventh-step">
				<FaBars />
			</Button>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader fontSize={"1.5rem"}>{title} Steps</DrawerHeader>

					<DrawerBody>
						{steps &&
							steps.map((step) => (
								<NavItem
									onClick={() => {
										handleOnClick(step);
										onClose();
									}}>
									<chakra.span color={current == step.id ? useColorModeValue("blue.500", "blue.300") : ""}>
										{" "}
										{step.title}
									</chakra.span>
								</NavItem>
							))}
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose} w={"100%"}>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
