import { Adinkra } from "./adinkra";
import { AnishinaabeArcs } from "./anishinaabearcs";
import BeadLoomProgramming from "./beadloom/beadloom-programming.json";
import { Cornrows } from "./cornrows";
import { PreColumbian } from "./precolumbian";
import { Quilting } from "./quilting";
import { TooledLeather } from "./tooledleather";
import { WovenHeavenTangledEarth } from "./whte";
import { YarnArts } from "./yarnarts";

export const AvailableSets = {
	...TooledLeather,
	...Quilting,
	...Cornrows,
	...YarnArts,
	...Adinkra,
	...WovenHeavenTangledEarth,
	...PreColumbian,
	...AnishinaabeArcs,
	"beadloom-programming": BeadLoomProgramming,
};
