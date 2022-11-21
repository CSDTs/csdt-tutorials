import { Box, Button, chakra, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function StepNavigation({ current, available }) {
	const prev = useRef(null);
	const next = useRef(null);

	const handleClick = (num) => {
		const temp = current.get() + num;
		current.set(temp);
	};

	return (
		<>
			<Flex py="5" align="center" className="third-step" justifyContent={"space-between"} w={"100%"} mt="auto">
				<Text>
					<span className="font-medium">Step</span> <span>{current.get() + 1}</span>
					{"/" + available.length}
				</Text>{" "}
				{/* <div class="relative flex flex-col items-center group">
					<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
						<span class="relative z-10 p-2 text-sm leading-none text-white whitespace-no-wrap bg-black shadow-lg">
							Click to jump to step
						</span>
						<div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
					</div>
				</div> */}
				<Box textAlign={"right"} w={"100%"}>
					<Button
						variant="outline"
						colorScheme="blue"
						px={5}
						mx={2}
						id="prev"
						ref={prev}
						onClick={() => {
							handleClick(-1);
						}}
						disabled={current.get() == 0}>
						Prev
					</Button>
					<Button
						id="next"
						colorScheme="blue"
						px={5}
						ref={next}
						onClick={() => {
							handleClick(1);
						}}
						disabled={current.get() == available.length - 1}>
						Next
					</Button>
				</Box>
			</Flex>
		</>
	);
}
