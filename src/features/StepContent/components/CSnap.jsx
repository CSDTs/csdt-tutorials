import { Box, chakra } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CSnapService from "../../../services/csnap.service";
import { LoadContainer } from "../../Loading";

export default function CSnap({ base }) {
	const csnap = useRef(null);
	const [ide, setIde] = useState(null);
	const { data, isLoading, isError } = CSnapService.loadBaseProject(`assets/${base}`);

	useEffect(() => {
		if (data && ide) {
			ide.loadTutorial(data, true);
		}
	}, [data, ide]);

	const checkForWorld = () => {
		if (csnap.current.contentWindow.world.children) {
			setIde(csnap.current.contentWindow.world.children[0]);
		}
	};

	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			<Box borderWidth="4px" borderStyle="dashed" rounded="md" h="80vh">
				<chakra.iframe
					src="csnap_pro/csdt/snap.html"
					frameBorder="0"
					w={"100%"}
					h={"100%"}
					onLoad={() => checkForWorld()}
					ref={csnap}
				/>
			</Box>{" "}
		</LoadContainer>
	);
}
