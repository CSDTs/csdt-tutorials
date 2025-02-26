import { Stack } from "@chakra-ui/react";

import { NAV_ITEMS } from "../../data/navigation";
import { MobileNavItem } from "./mobile-nav-item";

export const MobileNav = () => {
  return (
    <Stack bg={"gray.800"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};
