import { FC } from "react";

interface Conditions {
	source?: string;
}
const CodeImage: FC<Conditions> = ({ source }) => {
	return <img src={source} alt="The step's blocks" className="px-2 mx-auto py-5 w-2/3" />;
};
export default CodeImage;
