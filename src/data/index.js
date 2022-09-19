import BeadLoomProgramming from "./beadloom/beadloom-programming.json";

import { Cornrows } from "./cornrows";
import { Quilting } from "./quilting";
import { TooledLeather } from "./tooledleather";

import { YarnArts } from "./yarnarts";
export const AvailableSets = {
	...TooledLeather,
	...Quilting,
	...Cornrows,
	...YarnArts,
	"beadloom-programming": BeadLoomProgramming,
};
