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
				if (typeof ide[mod] === "function") {
					ide[mod]();
				}
			});
		}
	}, [modifiers]);

	useEffect(() => {
		if (ide && modifiers) {
			modifiers.forEach((mod) => {
				if (typeof ide[mod] === "function") {
					ide[mod]();
				}
			});
		}

		if (ide && globalModifiers) {
			globalModifiers.forEach((mod) => {
				if (typeof ide[mod] === "function") {
					ide[mod]();
				}
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
			<div className="h-full my-auto border-4 border-gray-500 border-dashed rounded-md fifth-step">
				<chakra.iframe src={source} frameBorder="0" w={"100%"} h={"100%"} onLoad={() => checkForWorld()} ref={csnap} />
			</div>{" "}
		</LoadContainer>
	);
}
