import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { Step } from "../../types";

type Props = {
	current: {
		get: () => number;
		set: (step: number) => void;
	};
	available: Step[];
};

export function StepNavigation({ current, available }: Props) {
	const prev = useRef(null);
	const next = useRef(null);

	const handleClick = (num: number) => {
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
