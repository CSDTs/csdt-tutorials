import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Button,
	DarkMode,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaCog } from "react-icons/fa";
interface Info {
	tutorial_title: string;
	tool: string;
	prefix: string;
	base: string;
	legacy?: boolean;
}
interface SettingProps {
	ide: any;
	info: Info;
	gui: GUI;
	setGui: (e: any) => void;
	startWalkThrough: (e: boolean) => void;
}

interface GUI {
	toggleWidth: boolean;
	isCodeShown: boolean;
	isLongDescriptionShown: boolean;
	longDescription?: string;
}

const SettingsButton: FC<SettingProps> = ({ ide, info, gui, setGui, startWalkThrough }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	const handleWalkThrough = () => {
		startWalkThrough(true);
	};

	const handleReset = () => {
		localStorage.removeItem("walkThroughPrompt");
	};
	return (
		<DarkMode>
			<Menu closeOnSelect={false}>
				<MenuButton
					leftIcon={<FaCog />}
					rightIcon={<ChevronDownIcon />}
					as={Button}
					className=" sixth-step"
					size={"sm"}
					color="white">
					Settings
				</MenuButton>
				<MenuList minWidth="240px" fontSize={"sm"} color="white" borderColor={"gray.600"}>
					<MenuOptionGroup title="Tutorial" type="checkbox">
						<MenuItemOption
							value="toggleSplitScreen"
							// onClick={() => setWidth(width == 96 ? "40rem" : 96)}
							onClick={() => setGui({ ...gui, toggleWidth: !gui.toggleWidth })}>
							Toggle Split Screen View
						</MenuItemOption>
						{/* <MenuItemOption value="toggleDarkMode" onClick={toggleColorMode}>
							Toggle Dark Mode
						</MenuItemOption> */}
						<MenuItemOption value="triggerLayoutTour" onClick={handleWalkThrough}>
							Start Layout Tour
						</MenuItemOption>
					</MenuOptionGroup>

					{!info?.legacy && (
						<>
							<MenuDivider />
							<MenuOptionGroup title="CSnap" type="checkbox">
								<MenuItemOption value="singlePalette" onClick={() => ide.toggleSinglePalette()}>
									Toggle Single Palette
								</MenuItemOption>
								<MenuItemOption value="corralBar" onClick={() => ide.toggleCorralBar()}>
									Toggle Corral Bar
								</MenuItemOption>
								<MenuItemOption value="tabs" onClick={() => ide.toggleTabs()}>
									Toggle Tabs
								</MenuItemOption>
								<MenuItemOption value="spriteBar" onClick={() => ide.toggleSpriteBar()}>
									Toggle Sprite Bar
								</MenuItemOption>
							</MenuOptionGroup>
						</>
					)}

					<MenuDivider />
					<MenuOptionGroup title="Help" type="checkbox">
						<MenuItemOption value="codeShown" onClick={() => setGui({ ...gui, isCodeShown: !gui.isCodeShown })}>
							{gui.isCodeShown ? "Hide" : "Show"} finished step code
						</MenuItemOption>{" "}
						<MenuItemOption
							value="descriptionShown"
							onClick={() => setGui({ ...gui, isLongDescriptionShown: !gui.isLongDescriptionShown })}
							isDisabled={!gui.longDescription}>
							{gui.isLongDescriptionShown ? "Hide" : "Show"} long description
						</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />

					<MenuGroup title="Misc">
						<MenuItem value="resetLayoutTour" onClick={handleReset} closeOnSelect={true}>
							Reset Layout Tour Prompt
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
		</DarkMode>
	);
};

export default SettingsButton;
