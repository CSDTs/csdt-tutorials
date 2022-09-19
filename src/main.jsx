import { ChakraProvider, Text } from "@chakra-ui/react";
import { TourProvider, useTour } from "@reactour/tour";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import Homepage from "./pages/Homepage";

const steps = [
	{
		selector: ".first-step",
		content: `Welcome to the tutorial! Let's get familiar with the interface.`,
	},
	{
		selector: ".second-step",
		content: `This sidebar holds all the available information for the current step.`,
	},
	{
		selector: ".third-step",
		content: `You can advance to the next step, or go back to the previous step.`,
	},
	{
		selector: ".fourth-step",
		content: `You can also click on a specific step here.`,
	},
	{
		selector: ".fifth-step",
		content: `This is CSnap. You create your scripts here. Once finished, you click on the green flag to run your code.`,
	},
	{
		selector: ".sixth-step",
		content: `You can adjust the current tutorial with modifiers, found here.`,
	},

	{
		selector: ".final-step",
		content: ({ setIsOpen }) => (
			<div>
				<Text>Finally, you are ready to begin.</Text>
				<button onClick={() => setIsOpen((o) => false)}>Toggle Tour</button>
			</div>
		),
	},
];

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<TourProvider steps={steps}>
				<ChakraProvider>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/:name" element={<App />} />
					</Routes>
				</ChakraProvider>
			</TourProvider>
		</BrowserRouter>
	</React.StrictMode>
);
