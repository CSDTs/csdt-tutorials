import { FC } from "react";

interface Conditions {
	source?: string;
}
const OutcomeImage: FC<Conditions> = ({ source }) => {
	return <img src={source} alt="The result when you finish the tutorial" />;
};

export default OutcomeImage;
