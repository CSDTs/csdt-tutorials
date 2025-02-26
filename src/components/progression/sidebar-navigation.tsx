import { useRef } from "react";
import { Step } from "../../types";

type Props = {
	current: {
		get: () => number;
		set: (step: number) => void;
	};
	available: Step[];
};
export const SidebarNavigation = ({ current, available }: Props) => {
	const prev = useRef(null);
	const next = useRef(null);

	const handleClick = (num: number) => {
		const temp = current.get() + num;
		current.set(temp);
	};

	return (
		<section className="py-5 items-center third-step justify-between w-full mt-auto flex">
			<p className=" text-gray-50">
				{" "}
				<span className="font-medium">Step</span> <span>{current.get() + 1}</span>
				{"/" + available.length}
			</p>{" "}
			<div className="text-right w-full">
				<button
					className="mx-2 border-blue-200 border text-blue-200 font-semibold px-5 py-2 rounded-md enabled:hover:bg-blue-300  transition ease-linear disabled:text-opacity-50 disabled:cursor-not-allowed disabled:border-opacity-50 enabled:hover:bg-opacity-10  "
					id="prev"
					ref={prev}
					onClick={() => {
						handleClick(-1);
					}}
					disabled={current.get() == 0}>
					Prev
				</button>
				<button
					className="bg-blue-200 text-gray-900 font-semibold px-5 py-2 rounded-md enabled:hover:bg-blue-300 transition ease-linear disabled:bg-opacity-50 disabled:cursor-not-allowed"
					id="next"
					ref={next}
					onClick={() => {
						handleClick(1);
					}}
					disabled={current.get() == available.length - 1}>
					Next
				</button>
			</div>
		</section>
	);
};
