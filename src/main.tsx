import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Text,
} from "@chakra-ui/react";
import { StepType, TourProvider } from "@reactour/tour";

import App from "./App";

import "./styles/index.css";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const steps = [
  {
    // selector: ".first-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          Welcome to the tutorial! Let's get familiar with the interface.
        </Text>
      </Box>
    ),
  },
  {
    selector: ".second-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          This sidebar holds all the available information for the current step.
        </Text>
      </Box>
    ),
  },
  {
    selector: ".third-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          You can advance to the next step, or go back to the previous step.
        </Text>
      </Box>
    ),
  },
  {
    selector: ".fourth-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          You can also click on a specific step here, as well as track your
          progress.
        </Text>
      </Box>
    ),
  },
  {
    selector: ".fifth-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          This is CSnap. You create your scripts here. Once finished, you click
          on the green flag to run your code.
        </Text>
      </Box>
    ),
  },
  {
    selector: ".sixth-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          You can adjust the current tutorial with modifiers, found here. Or
          adjust the layout to make doing the tutorial easier.
        </Text>
      </Box>
    ),
  },
  {
    selector: ".seventh-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>You can jump to a specific step here.</Text>
      </Box>
    ),
  },
  {
    selector: ".help-step",
    content: () => (
      <Box>
        <Text color={"gray.800"}>
          If you find yourself struggling with using CSnap, check out our help
          section here for more information.
        </Text>
      </Box>
    ),
  },

  {
    content: ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => (
      <Box>
        <Text color={"gray.800"}>Finally, you are ready to begin.</Text>
        <Button
          onClick={() => setIsOpen(false)}
          w={"100%"}
          mt={4}
          colorScheme="blue"
        >
          End Tour
        </Button>
      </Box>
    ),
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <TourProvider steps={steps as StepType[]}>
          <App />
        </TourProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
