import { PuffLoader } from "react-spinners";

import { Flex } from "@chakra-ui/react";

const override = {
  display: "block",
  margin: "0 auto",
};

export function LoadIndicator({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <PuffLoader
            color={"#000000"}
            loading={isLoading}
            cssOverride={override}
            size={150}
          />
        </Flex>
      )}
    </>
  );
}
