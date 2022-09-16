import { Box, Button, chakra, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function StepNavigation({ current, available }) {
	const prev = useRef(null);
	const next = useRef(null);

	const handleClick = (num) => {
		const temp = current.get() + num;
		current.set(temp);
	};

	return (
		<Flex py="5" align="center">
			<Text>Step {current.get() + 1 + "/" + available.length}</Text>
			<Box textAlign={"center"} w={"100%"}>
				<button
					className="btn"
					id="prev"
					ref={prev}
					onClick={() => {
						handleClick(-1);
					}}
					disabled={current.get() == 0}>
					Prev
				</button>
				<button
					className="btn"
					id="next"
					ref={next}
					onClick={() => {
						handleClick(1);
					}}
					disabled={current.get() == available.length - 1}>
					Next
				</button>
			</Box>
		</Flex>
	);
}
