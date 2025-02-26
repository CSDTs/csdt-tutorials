import { ReactNode } from "react";

type Props = {
  toggleWidth: boolean;
  children: ReactNode;
};
export const SidebarContainer = ({ toggleWidth, children }: Props) => {
  return (
    <nav
      className={`second-step fixed z-auto hidden bg-gray-50 dark:bg-gray-900 md:flex md:flex-col ${
        toggleWidth ? "w-2/6" : "w-96"
      } top-0 left-0 h-full overflow-y-auto overflow-x-hidden border-r-black border-opacity-30 px-8 pt-5 pb-10 transition-all duration-200 ease-linear`}
    >
      {children}
    </nav>
  );
};
