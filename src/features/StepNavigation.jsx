import { Box, Button, chakra, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";
import StepSelection from "./StepSelection";
const StepNavigation = ({ current, available }) => {
	const prev = useRef(null);
	const next = useRef(null);

	const handleClick = (num) => {
		const temp = current.get() + num;
		current.set(temp);
	};

	return (
		<>
			<section className="py-5 items-center third-step justify-between w-full mt-auto flex">
				<p className=" text-gray-50">
					{" "}
					<span className="font-medium">Step</span> <span>{current.get() + 1}</span>
					{"/" + available.length}
				</p>{" "}
				<div className="text-right w-full">
					{/* <Button
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
					</Button> */}
					{/* <Button
						id="next"
						colorScheme="blue"
						px={5}
						ref={next}
						onClick={() => {
							handleClick(1);
						}}
						disabled={current.get() == available.length - 1}>
						Next
					</Button>{" "} */}
					<button
						className="mx-2 border-blue-200 border text-blue-200 font-semibold px-5 py-2 rounded-md enabled:hover:bg-blue-300  transition ease-linear disabled:text-opacity-50 disabled:cursor-not-allowed disabled:border-opacity-50 enabled:hover:bg-opacity-10  "
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
					</button>
					<button
						className="bg-blue-200 text-gray-900 font-semibold px-5 py-2 rounded-md enabled:hover:bg-blue-300 transition ease-linear disabled:bg-opacity-50 disabled:cursor-not-allowed"
						id="next"
						ref={next}
						onClick={() => {
							handleClick(1);
						}}
						disabled={current.get() == available.length - 1}>
						Next
					</button>
				</div>
			</section>
		</>
	);
};

export default StepNavigation;
