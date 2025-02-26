import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverTrigger,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import { NAV_ITEMS } from "../../data/navigation";

export const DesktopNav = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "white";
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <Stack direction={"row"} spacing={4} alignItems="center">
      <Box display={isLargerThan1300 ? "none" : "block"}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            fontSize={"sm"}
            fontWeight={500}
          >
            More...
          </MenuButton>
          <MenuList>
            {NAV_ITEMS.map((item) => (
              <MenuItem key={item.label} as="a" href={item.href ?? "#"}>
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} display={isLargerThan1300 ? "block" : "none"}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                whiteSpace="nowrap"
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
