import { Box, Flex } from "@chakra-ui/react";
import { useRef } from "react";
import { Step } from "../../types";

type Props = {
	current: {
		get: () => number;
		set: (step: Step) => void;
	};
	available: Step[];
};

export function StepProgressBar({ current, available }: Props) {
	const circles = useRef([]);

	const handleClick = (step: Step) => {
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
								circles.current[index] = element as never;
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
