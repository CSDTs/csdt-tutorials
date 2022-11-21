import Plyr from "plyr-react";

import "plyr-react/plyr.css";
import { FC } from "react";
interface Conditions {
	source?: string;
}
const StepVideo: FC<Conditions> = ({ source }) => {
	return (
		<>
			<div className="w-full aspect-video">
				<Plyr
					options={{
						controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "settings", "fullscreen"],
					}}
					source={{
						type: "video",

						sources: [
							{
								src: source ?? "",
								type: "video/mp4",
							},
						],
					}}
				/>
			</div>{" "}
		</>
	);
};

export default StepVideo;
