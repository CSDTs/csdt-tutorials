import { Transition } from "@headlessui/react";
import { useState } from "react";

type Props = {
	current: {
		get: () => number;
		set: (step: unknown) => void;
	};
	available: unknown[];
};
function StepSelection({ current, available }: Props) {
	const [isShowing, setIsShowing] = useState(false);
	const handleClick = (step: unknown) => {
		current.set(step);
	};

	return (
		<>
			<Transition
				show={isShowing}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 -translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 -translate-y-1">
				<div className="container max-h-96 overflow-y-auto border-4 rounded-lg absolute z-50">
					<div className="flex flex-col md:grid grid-cols-12 text-gray-50 z-50">
						<div className="flex md:contents z-50">
							<div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
								<div className="h-full w-6 flex items-center justify-center">
									<div className="h-full w-1 bg-green-500 pointer-events-none"></div>
								</div>
								<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
									<i className="fas fa-check-circle text-white"></i>
								</div>
							</div>
							<div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
								<h3 className="font-semibold text-lg mb-1">Package Booked</h3>
							</div>
						</div>

						{/* <div className="flex md:contents">
							<div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
								<div className="h-full w-6 flex items-center justify-center">
									<div className="h-full w-1 bg-green-500 pointer-events-none"></div>
								</div>
								<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
									<i className="fas fa-check-circle text-white"></i>
								</div>
							</div>
							<div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
								<h3 className="font-semibold text-lg mb-1">Out for Delivery</h3>
								<p className="leading-tight text-justify">22 July 2021, 01:00 PM</p>
							</div>
						</div>

						<div className="flex md:contents">
							<div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
								<div className="h-full w-6 flex items-center justify-center">
									<div className="h-full w-1 bg-red-500 pointer-events-none"></div>
								</div>
								<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">
									<i className="fas fa-times-circle text-white"></i>
								</div>
							</div>
							<div className="bg-red-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
								<h3 className="font-semibold text-lg mb-1 text-gray-50">Cancelled</h3>
								<p className="leading-tight text-justify">Customer cancelled the order</p>
							</div>
						</div> */}
						{available?.map((item, index) => (
							<div className="flex md:contents" key={index} onClick={() => handleClick(item)}>
								<div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
									<div className="h-full w-6 flex items-center justify-center">
										<div className="h-full w-1 bg-gray-300 pointer-events-none"></div>
									</div>
									<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
										<i className="fas fa-exclamation-circle text-gray-400"></i>
									</div>
								</div>
								<div className="bg-gray-300 col-start-4 col-end-12 px-4 py-2 rounded-xl my-4 mr-auto shadow-md w-full">
									<h3 className="font-semibold text-base mb-1 text-gray-400">{item.title}</h3>
									<p className="leading-tight text-justify"></p>
								</div>
							</div>
						))}
					</div>
				</div>
			</Transition>
			<button onClick={() => setIsShowing((isShowing) => !isShowing)}>Lessons</button>
		</>
	);
}
export default StepSelection;
