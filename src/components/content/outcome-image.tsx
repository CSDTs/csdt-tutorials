import { FC } from "react";

type Props = {
  source?: string;
};
export const OutcomeImage: FC<Props> = ({ source }) => {
  return <img src={source} alt="The result when you finish the tutorial" />;
};
