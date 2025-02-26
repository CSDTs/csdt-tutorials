import Plyr from "plyr-react";

import "plyr-react/plyr.css";

type Props = {
  url: string;
};

export default function StepVideo({ url }: Props) {
  const prefix = "https://csdt-media.s3.us-east-2.amazonaws.com/tutorials/";

  return (
    <>
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
              src: prefix + url,
              type: "video/mp4",
            },
          ],
        }}
      />
    </>
  );
}
