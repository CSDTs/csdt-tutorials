import { Text } from "@chakra-ui/react";

import { LoadIndicator } from "./load-indicator";

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  isError: boolean;
  errorMsg?: string;
};

export function LoadContainer({
  isLoading,
  children,
  isError,
  errorMsg = "There seems to be an issue connecting to the server. Please try again later.",
}: Props) {
  return (
    <>
      <LoadIndicator isLoading={isLoading} />
      {!isLoading && <>{children}</>}
      {isError && <Text>{errorMsg}</Text>}
    </>
  );
}
