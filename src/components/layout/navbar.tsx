import { FaRegQuestionCircle, FaRegUser, FaUserAlt } from "react-icons/fa";

import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  chakra,
  Collapse,
  DarkMode,
  Divider,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const prefix = import.meta.env.PROD ? "/assets/img/misc" : "";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  return (
    <DarkMode>
      <Flex
        position="sticky"
        top={0}
        className="bg-gray-800"
        color={"white"}
        minH={"60px"}
        width={"100%"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        zIndex={5}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.900"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          verticalAlign={"middle"}
        >
          <a href="https://www.nsf.gov/">
            <Image src={prefix + "/nsf.gif"} boxSize={"40px"} />
          </a>
          <a href="/">
            <Image src={prefix + "/logo.svg"} />
          </a>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={4}
          verticalAlign={"middle"}
          zIndex={10}
        >
          {currentUser?.username && (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                leftIcon={<FaUserAlt />}
                variant="ghost"
              >
                <chakra.span px={1}>{currentUser?.username}</chakra.span>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    window.location.href = "/users/" + currentUser?.id;
                  }}
                >
                  My Projects
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.href =
                      "/users/" + currentUser?.id + "/classes";
                  }}
                >
                  My Classrooms
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.href =
                      "/users/" + currentUser?.id + "/workbooks";
                  }}
                >
                  My Workbooks
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    window.location.href = "/accounts/logout/";
                  }}
                >
                  Not you? (LOGOUT)
                </MenuItem>
              </MenuList>
            </Menu>
          )}

          {!currentUser?.username && (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/accounts/signup/"}
              >
                Sign Up
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                // color={"white"}
                variant="ghost"
                justifyContent={"space-between"}
                href={"/accounts/login/"}
              >
                <FaRegUser /> <chakra.span px={1}>Login</chakra.span>
              </Button>
            </>
          )}

          <Center
            height="auto"
            py={"10px"}
            color={"teal"}
            display={{ base: "none", md: "inline-flex" }}
          >
            <Divider orientation="vertical" borderColor={"white"} />
          </Center>
          <a
            href="/culture/help/index.html"
            className="font-lg text-bold my-auto inline-flex h-full justify-center"
          >
            <FaRegQuestionCircle />
          </a>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </DarkMode>
  );
}
