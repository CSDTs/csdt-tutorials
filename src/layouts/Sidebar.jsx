import { useState } from "react";

import { StepProgressBar } from "../features/StepProgression";

import CodeImage from "../features/CodeImage";
import OutcomeImage from "../features/OutcomeImage";
import StepNavigation from "../features/StepNavigation";
import StepSelection from "../features/StepSelection";
import StepVideo from "../features/StepVideo";
import VideoDescription from "../features/VideoDescription";
import SidebarContainer from "./SidebarContainer";
export default function Sidebar(props) {
	const { info, step, setStep, available, isCodeShown, toggleWidth } = props;

	const [currentActive, setCurrentActive] = useState(0);

	const pathname = "assets/" + info?.prefix;
	const codeImageSource = pathname + step?.code;
	const stepVideoSource = pathname + step?.video;
	const outcomeImageSource = pathname + step?.outcome;
	const videoDescriptionSource = pathname + step?.explanation;

	return (
		<SidebarContainer toggleWidth={toggleWidth}>
			<header className="font-medium text-xl pt-5">{info?.tutorial_title}</header>
			{/* <p className="pb-5">Tooled Leather </p> */}

			{available && available.length > 0 && (
				<StepProgressBar
					current={{
						get: () => {
							return currentActive;
						},
						set: (val) => {
							setCurrentActive(val.id);
							setStep(val);
						},
					}}
					available={available}
				/>
			)}

			<section className="flex flex-col justify-between">
				<div className="flex flex-col text-sm" aria-label="Main Navigation">
					{/* {step?.description && <StepDescription description={step?.description} short={step?.short} />} */}

					<p className="text-lg text-slate-600">Instructions</p>
					{step?.video && <StepVideo source={stepVideoSource} />}

					{step?.explanation && step?.tagline && (
						<VideoDescription source={videoDescriptionSource} tagline={step?.tagline} />
					)}

					{step?.outcome && <OutcomeImage source={outcomeImageSource} />}

					{step?.code && isCodeShown && <CodeImage source={codeImageSource} />}
				</div>
			</section>

			{available && available.length > 0 && (
				<StepNavigation
					current={{
						get: () => {
							return currentActive;
						},
						set: (val) => {
							setCurrentActive(val);
							setStep(available[val]);
						},
					}}
					available={available}
				/>
			)}
		</SidebarContainer>
	);
}
