import { useState } from "react";

import { Box, Flex, Image, Stack, useColorModeValue } from "@chakra-ui/react";

import { Step, TutorialInfo } from "../../types";
import StepDescription from "../content/step-description";
import StepVideo from "../content/step-video";
import { StepNavigation } from "../progression/step-navigation";
import { StepProgressBar } from "../progression/step-progression";

type Props = {
  info: TutorialInfo | null;
  step: Step | null;
  setStep: (step: Step) => void;
  available: Step[];
  isCodeShown: boolean;
};
export function SidebarContent(props: Props) {
  const { info, step, setStep, available, isCodeShown, ...styles } = props;

  const [currentActive, setCurrentActive] = useState(0);

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      // zIndex="sticky"
      h="full"
      px="8"
      pt="5"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      display={{
        base: "flex",
      }}
      borderRight="none"
      flexDirection="column"
      // bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w={96}
      transition=".3s ease"
      zIndex={"auto"}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box py="5">
        <header className="text-xl font-semibold">
          {info?.tutorial_title}
        </header>
        <p>En Espanol </p>
      </Box>

      {available && available.length > 0 && (
        <StepProgressBar
          current={{
            get: () => {
              return currentActive;
            },
            set: (val) => {
              setCurrentActive(val.id);
              setStep(val);
            },
          }}
          available={available}
        />
      )}

      <Stack direction="column" justifyContent="space-between" spacing={96}>
        <Flex
          direction="column"
          fontSize="sm"
          color="teal"
          aria-label="Main Navigation"
        >
          {step?.description && (
            <StepDescription
              description={step?.description}
              short={step?.short ?? ""}
            />
          )}

          {step?.video && <StepVideo url={info?.prefix + step?.video} />}

          {step?.outcome && (
            <Image src={"assets/" + info?.prefix + step?.outcome} />
          )}

          {step?.code && isCodeShown && (
            <Image src={"assets/" + info?.prefix + step?.code} />
          )}
        </Flex>
      </Stack>

      {available && available.length > 0 && (
        <StepNavigation
          current={{
            get: () => {
              return currentActive;
            },
            set: (val) => {
              setCurrentActive(val);
              setStep(available[val]);
            },
          }}
          available={available}
        />
      )}
    </Box>
  );
}
