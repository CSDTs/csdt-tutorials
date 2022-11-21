import { FC, ReactNode } from "react";

interface SidebarProps {
	toggleWidth: boolean;
	children: ReactNode;
}
const SidebarContainer: FC<SidebarProps> = ({ toggleWidth, children }) => {
	return (
		<nav
			className={`second-step z-auto bg-gray-50 dark:bg-gray-900 fixed hidden md:flex md:flex-col ${
				toggleWidth ? "w-2/6" : "w-96"
			}  top-0 left-0 h-full px-8 pt-5 pb-10 overflow-x-hidden overflow-y-auto border-r-black border-opacity-30  ease-linear duration-200 transition-all`}>
			{children}
		</nav>
	);
};

export default SidebarContainer;
