import Plyr from "plyr-react";

import "plyr-react/plyr.css";

type Props = {
  source?: string;
};
export const SidebarVideo = ({ source }: Props) => {
  return (
    <>
      <div className="aspect-video w-full">
        <Plyr
          options={{
            controls: [
              "play-large",
              "play",
              "progress",
              "current-time",
              "mute",
              "volume",
              "settings",
              "fullscreen",
            ],
          }}
          source={{
            type: "video",

            sources: [
              {
                src: source
                  ? `https://csdt-media.s3.us-east-2.amazonaws.com/tutorials/${source}`
                  : "",
                type: "video/mp4",
              },
            ],
          }}
        />
      </div>{" "}
    </>
  );
};
