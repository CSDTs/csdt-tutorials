import { Box, Button, chakra, Flex, Heading, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function StepProgressBar({ current, available }) {
	const circles = useRef([]);

	const handleClick = (step) => {
		current.set(step);
	};
	return (
		<Flex py="5" align="center">
			<Box textAlign={"center"} w={"100%"}>
				<Box className="progress-container  fourth-step">
					<Box className="progress" id="progress" w={`${(current.get() / (available.length - 1)) * 100 + "%"}`}></Box>

					{available.map((item, index) => (
						<div
							className={`circle ${index <= current.get() ? "active" : ""}`}
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
