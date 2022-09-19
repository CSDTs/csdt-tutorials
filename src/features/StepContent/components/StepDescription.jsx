import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
} from "@chakra-ui/react";
import { Parser } from "html-to-react";

export default function StepDescription({ short, description }) {
	return (
		<>
			<Heading size={"md"}>Description</Heading>
			<Accordion allowToggle>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								{short}
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>{Parser().parse(description)}</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</>
	);
}
