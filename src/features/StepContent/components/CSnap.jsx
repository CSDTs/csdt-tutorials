import {
	Box,
	Button,
	chakra,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaCog } from "react-icons/fa";
import CSnapService from "../../../services/csnap.service";
import { LoadContainer } from "../../Loading";

export default function CSnap({ base, coreList, whitelist, modifiers, globalModifiers, ide, setIde }) {
	const csnap = useRef(null);
	// const [ide, setIde] = useState(null);
	const { data, isLoading, isError } = CSnapService.loadBaseProject(`assets/${base}`);

	const [blocks, setBlocks] = useState(null);

	const [ready, setReady] = useState(false);

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
			<Box borderWidth="4px" borderStyle="dashed" rounded="md" h="80vh" className=" fifth-step">
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
