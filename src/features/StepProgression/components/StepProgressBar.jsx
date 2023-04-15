import { Box, Button, chakra, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import FinalModal from "../../FinalModal";
export default function StepProgressBar({ current, available }) {
	const circles = useRef([]);

	const handleClick = (step) => {
		current.set(step);
	};

	return (
		<Flex pt="5" align="center">
			<Box textAlign={"center"} w={"100%"}>
				<Box className="progress-container  fourth-step">
					<Box className="progress" id="progress" w={`${(current.get() / (available.length - 1)) * 100 + "%"}`}></Box>

					{available.map((item, index) => (
						<div
							className={`circle ${index <= current.get() ? "active" : ""} cursor-pointer`}
							key={index}
							ref={(element) => {
								circles.current[index] = element;
							}}
							onClick={() => handleClick(item)}>
							{index + 1}
						</div>
					))}
				</Box>
			</Box>
		</Flex>
	);
}
