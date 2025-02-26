import { useNavigate } from "react-router-dom";

import {
  Button,
  DarkMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  nextSteps?: string;
  outcome?: string;
  background?: string;
  software?: string;
};

export const FinalModal = ({
  isOpen,
  onOpen,
  onClose,
  nextSteps,
  outcome,
  background,
  software,
}: Props) => {
  const navigate = useNavigate();

  const launchTutorials = () => {
    if (import.meta.env.PROD) {
      window.location.href = "/assets/tutorials/index.html";
    } else {
      navigate("/");
    }
  };

  const launchBackground = () => {
    window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + background;
  };

  const launchSoftware = () => {
    window.location.href = import.meta.env.VITE_BACKGROUND_PREFIX + software;
  };
  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent color="white">
          <ModalHeader>Congratulations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <p className="mb-5 mt-2">
                {nextSteps ||
                  "You completed the tutorial. You are now ready to move on to the simulation where you create your own designs!"}
              </p>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {background && (
                    <Button
                      onClick={launchBackground}
                      w={{ base: "100%", sm: "50%" }}
                    >
                      Review the background
                    </Button>
                  )}
                  <Button
                    onClick={launchTutorials}
                    w={{ base: "100%", sm: "50%" }}
                  >
                    Try another tutorial
                  </Button>
                </Stack>
                {software && (
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    onClick={launchSoftware}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Jump into the software
                  </Button>
                )}
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};
