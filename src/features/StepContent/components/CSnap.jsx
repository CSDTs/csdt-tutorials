import { Box, chakra } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import CSnapService from "../../../services/csnap.service";
import { LoadContainer } from "../../Loading";

export default function CSnap({ base, coreList, whitelist, modifiers, globalModifiers, ide, setIde, legacy }) {
	const csnap = useRef(null);
	const prefix = import.meta.env.PROD ? "/static/" : "";

	const { data, isLoading, isError } = CSnapService.loadBaseProject(`assets/${base}`);

	const [blocks, setBlocks] = useState(null);

	const [ready, setReady] = useState(false);

	const source = legacy ? `${prefix}csnap/tutorial.html` : `${prefix}csnap_pro/csdt/snap.html`;

	useEffect(() => {
		if (ide) setBlocks(ide.fetchBlockList());
		if (data && ide) {
			ide.loadTutorial(data, false, coreList, whitelist, () => {
				setReady(true);
			});
		}
	}, [data, ide]);

	useEffect(() => {
		if (ide && whitelist) ide.displayTutorialBlocks(coreList, whitelist);
	}, [whitelist]);

	useEffect(() => {
		if (ide && modifiers) {
			modifiers.forEach((mod) => {
				eval(`ide.${mod}()`);
			});
		}
	}, [modifiers]);

	useEffect(() => {
		if (ide && modifiers) {
			modifiers.forEach((mod) => {
				eval(`ide.${mod}()`);
			});
		}

		if (ide && globalModifiers) {
			globalModifiers.forEach((mod) => {
				eval(`ide.${mod}()`);
			});
		}
		if (ide && whitelist) ide.displayTutorialBlocks(coreList, whitelist);
	}, [ready]);

	const checkForWorld = () => {
		if (csnap.current.contentWindow.world.children) {
			setIde(csnap.current.contentWindow.world.children[0]);
		}
	};

	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			<Box borderWidth="4px" borderStyle="dashed" rounded="md" height={"100%"} className=" fifth-step" my={"auto"}>
				<chakra.iframe src={source} frameBorder="0" w={"100%"} h={"100%"} onLoad={() => checkForWorld()} ref={csnap} />
			</Box>{" "}
		</LoadContainer>
	);
}
