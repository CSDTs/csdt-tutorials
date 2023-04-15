import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Collapse,
	DarkMode,
	Divider,
	Flex,
	Icon,
	IconButton,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	chakra,
	useBreakpointValue,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { FaRegQuestionCircle, FaRegUser, FaUser, FaUserAlt } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
export default function Navigation() {
	const { isOpen, onToggle } = useDisclosure();
	const prefix = import.meta.env.PROD ? "/static/img/misc" : "";
	const currentUser = JSON.parse(localStorage.getItem("currentUser")) || "";

	return (
		<DarkMode>
			<Flex
				position="sticky"
				top={0}
				className="bg-gray-800"
				color={"white"}
				minH={"60px"}
				width={"100%"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				zIndex={5}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={"gray.900"}
				align={"center"}>
				<Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} verticalAlign={"middle"}>
					<a href="https://www.nsf.gov/">
						<Image src={prefix + "/nsf.gif"} boxSize={"40px"} />
					</a>
					<a href="/">
						<Image src={prefix + "/logo.svg"} />
					</a>
					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}
					verticalAlign={"middle"}
					zIndex={10}>
					{currentUser?.username && (
						<Menu>
							<MenuButton as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<FaUserAlt />} variant="ghost">
								<chakra.span px={1}>{currentUser?.username}</chakra.span>
							</MenuButton>
							<MenuList>
								<MenuItem
									onClick={() => {
										window.location.href = "/users/" + currentUser?.id;
									}}>
									My Projects
								</MenuItem>
								<MenuItem
									onClick={() => {
										window.location.href = "/users/" + currentUser?.id + "/classes";
									}}>
									My Classrooms
								</MenuItem>
								<MenuItem
									onClick={() => {
										window.location.href = "/users/" + currentUser?.id + "/workbooks";
									}}>
									My Workbooks
								</MenuItem>
								<MenuDivider />
								<MenuItem
									onClick={() => {
										window.location.href = "/accounts/logout/";
									}}>
									Not you? (LOGOUT)
								</MenuItem>
							</MenuList>
						</Menu>
					)}

					{!currentUser?.username && (
						<>
							<Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"/accounts/signup/"}>
								Sign Up
							</Button>
							<Button
								as={"a"}
								display={{ base: "none", md: "inline-flex" }}
								fontSize={"sm"}
								fontWeight={600}
								// color={"white"}
								variant="ghost"
								justifyContent={"space-between"}
								href={"/accounts/login/"}>
								<FaRegUser /> <chakra.span px={1}>Login</chakra.span>
							</Button>
						</>
					)}

					<Center height="auto" py={"10px"} color={"teal"} display={{ base: "none", md: "inline-flex" }}>
						<Divider orientation="vertical" borderColor={"white"} />
					</Center>
					<a href="/culture/help/index.html" className="font-lg text-bold my-auto h-full inline-flex justify-center">
						<FaRegQuestionCircle />
					</a>
					{/* <Button
						as={"a"}
						fontSize={"lg"}
						fontWeight={400}
						variant={"link"}
						href={"/culture/help/index.html"}
						className="help-step">
						
					</Button> */}
					{/* <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button> */}
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</DarkMode>
	);
}

const DesktopNav = () => {
	const linkColor = "gray.200";
	const linkHoverColor = "white";
	const popoverContentBgColor = "gray.800";

	return (
		<Stack direction={"row"} spacing={4} alignItems="center">
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
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
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link href={href} role={"group"} display={"block"} p={2} rounded={"md"} _hover={{ bg: "gray.900" }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack bg={"gray.800"} p={4} display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text fontWeight={600} color={"gray.200"}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={"gray.700"} align={"start"}>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: "Projects",
		href: "/projects",
	},
	{
		label: "News",
		href: "/news",
	},
	{
		label: "Publications",
		href: "/publications",
	},
	{
		label: "About",
		href: "/about",
	},
	{
		label: "Getting Started",
		href: "/getting-started",
	},
];
