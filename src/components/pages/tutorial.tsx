import { useEffect, useState } from "react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import { useTour } from "@reactour/tour";

import FetchService from "../../lib/fetch";
import { Step } from "../../types";
import CSnap from "../content/csnap";
import { FinalModal } from "../dialog/final-modal";
import { FirstTimeModal } from "../dialog/first-time-modal";
import { Footer } from "../layout/footer";
import { NavBar } from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import { SidebarContent } from "../layout/sidebar-content";
import SettingsButton from "../misc/settings-button";
import StepSelectionDrawer from "../progression/step-selection-drawer";

type Props = {
  name: string;
};

export default function Tutorial({ name }: Props) {
  const sidebar = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { info, data } = FetchService.selectSet(name);

  const [availableSteps, setAvailableSteps] = useState<Step[]>([]);

  const [currentStep, setCurrentStep] = useState<Step | null>(null);

  const [base, setBase] = useState(null);

  const [ide, setIde] = useState(null);

  useEffect(() => {
    if (data) {
      let temp = data.slice(1).map((lesson, i) => ({ ...lesson, id: i }));
      setAvailableSteps(temp as any);
      setCurrentStep(temp[0] as any);
      setBase((info as any).prefix + (info as any).base);
    }
  }, [data]);
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (currentStep?.id == availableSteps?.length - 1) onOpen();
    if (currentStep?.explanation) {
      fetch(
        `assets/${typeof info === "object" ? info?.prefix : ""}${currentStep?.explanation}`,
      )
        .then((response) => response.text())
        .then((text) => setGui({ ...gui, longDescription: text }))
        .catch((error) => console.error(error));
    } else {
      setGui({ ...gui, longDescription: "text" });
    }
  }, [currentStep]);

  const [gui, setGui] = useState({
    toggleWidth: false,
    isCodeShown: false,
    isLongDescriptionShown: false,
    longDescription: "",
  });

  return (
    <>
      <FirstTimeModal
        startWalkThrough={(e) => {
          setIsOpen(e);
          return null;
        }}
      />

      {currentStep?.id == availableSteps?.length - 1 && (
        <FinalModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          {...currentStep}
        />
      )}
      <section
        className={`first-step final-step min-h-screen bg-gray-50 dark:bg-gray-700`}
      >
        <Sidebar
          info={info}
          step={currentStep}
          setStep={setCurrentStep}
          available={availableSteps}
          isCodeShown={gui.isCodeShown}
          toggleWidth={gui.toggleWidth}
        />

        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton zIndex={1} />
            <SidebarContent
              info={info}
              step={currentStep}
              setStep={setCurrentStep}
              available={availableSteps}
              isCodeShown={gui.isCodeShown}
            />
          </DrawerContent>
        </Drawer>
        <section
          className={`${gui.toggleWidth ? "w-2/3 md:ml-auto" : "w-full md:ml-96 md:max-w-[calc(100vw-24rem)]"} flex min-h-screen flex-grow flex-col transition-all duration-300 ease-linear`}
        >
          <NavBar />

          <main className="h-full w-full p-4 transition-all duration-300 ease-in-out">
            <section className="my-2 flex items-center justify-between py-2">
              <header className="text-3xl font-bold text-gray-50">
                {currentStep?.title}
              </header>
              <div className="flex space-x-2">
                <SettingsButton
                  ide={ide}
                  info={info}
                  gui={gui}
                  setGui={setGui}
                  startWalkThrough={setIsOpen}
                />

                <StepSelectionDrawer
                  title={info?.tutorial_title || ""}
                  steps={availableSteps}
                  current={currentStep?.id || 0}
                  handleOnClick={setCurrentStep}
                />

                <Button
                  colorScheme="teal"
                  onClick={sidebar.onOpen}
                  display={{
                    base: "block",
                    md: "none",
                  }}
                >
                  Open
                </Button>
              </div>
            </section>

            {currentStep &&
              currentStep?.id < availableSteps?.length &&
              base && (
                <div
                  className={`${
                    gui.isLongDescriptionShown
                      ? "h-csnap-text overflow-y-auto"
                      : "h-csnap-normal overflow-y-auto md:h-csnap-normal-md"
                  } transition-all duration-500 ease-out`}
                >
                  <CSnap
                    base={base}
                    coreList={info?.core ?? []}
                    whitelist={currentStep?.whitelist ?? []}
                    modifiers={currentStep?.modifiers ?? []}
                    globalModifiers={info?.globalModifiers ?? []}
                    ide={ide}
                    setIde={setIde}
                    legacy={info?.legacy ?? false}
                  />
                </div>
              )}

            {gui.isLongDescriptionShown && (
              <SlideFade in={gui.isLongDescriptionShown} offsetY="20px">
                <Box
                  py="30px"
                  px={"40px"}
                  color="white"
                  mt="4"
                  bg="gray.800"
                  rounded="md"
                  shadow="md"
                  maxH={{ base: "35vh", md: "25vh" }}
                  overflowY="auto"
                >
                  <Heading size={{ base: "lg", md: "md" }} mb={3}>
                    Step Description
                  </Heading>
                  <Box maxH={{ base: "20vh", md: "15vh" }} overflowY={"auto"}>
                    <ReactMarkdown
                      components={ChakraUIRenderer()}
                      children={gui.longDescription}
                      skipHtml
                    />
                  </Box>
                </Box>
              </SlideFade>
            )}
          </main>

          <Footer tool={info?.tool || ""} />
        </section>
      </section>
    </>
  );
}
