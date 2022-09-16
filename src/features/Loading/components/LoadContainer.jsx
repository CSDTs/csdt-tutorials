import { Container, Text } from "@chakra-ui/react";
import LoadIndicator from "./LoadIndicator";

export default function LoadContainer({
	isLoading,
	children,
	isError,
	errorMsg = "There seems to be an issue connecting to the server. Please try again later.",
}) {
	return (
		<>
			<LoadIndicator isLoading={isLoading} />
			{!isLoading && <>{children}</>}
			{isError && <Text>{errorMsg}</Text>}
		</>
	);
}
