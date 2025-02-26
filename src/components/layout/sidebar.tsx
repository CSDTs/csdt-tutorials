import { useState } from "react";

import { Step, TutorialInfo } from "../../types";
import { CodeImage } from "../content/code-image";
import { OutcomeImage } from "../content/outcome-image";
import { SidebarVideo } from "../content/sidebar-video";
import VideoDescription from "../content/video-description";
import { SidebarNavigation } from "../progression/sidebar-navigation";
import { StepProgressBar } from "../progression/step-progression";
import { SidebarContainer } from "./sidebar-container";

type Props = {
  info: TutorialInfo | null;
  step: Step | null;
  setStep: (step: Step) => void;
  available: Step[];
  isCodeShown: boolean;
  toggleWidth: boolean;
};
export default function Sidebar(props: Props) {
  const { info, step, setStep, available, isCodeShown, toggleWidth } = props;

  const [currentActive, setCurrentActive] = useState(0);

  const pathname = "assets/" + info?.prefix;
  const codeImageSource = pathname + step?.code;
  const stepVideoSource = pathname + step?.video;
  const outcomeImageSource = pathname + step?.outcome;
  const videoDescriptionSource = pathname + step?.explanation;

  return (
    <SidebarContainer toggleWidth={toggleWidth}>
      <header className="pt-5 text-xl font-semibold text-gray-50">
        {info?.tutorial_title}
      </header>

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
          <p className="text-lg text-slate-600">Instructions</p>
          {step?.video && <SidebarVideo source={stepVideoSource} />}

          {step?.explanation && step?.tagline && (
            <VideoDescription
              source={videoDescriptionSource}
              tagline={step?.tagline}
            />
          )}

          {step?.outcome && <OutcomeImage source={outcomeImageSource} />}

          {step?.code && isCodeShown && <CodeImage source={codeImageSource} />}
        </div>
      </section>

      {available && available.length > 0 && (
        <SidebarNavigation
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
