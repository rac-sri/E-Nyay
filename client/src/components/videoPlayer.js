import React from "react";
import Video from "react-hls";

export default function VideoPlayer({ playbackUrl }) {
  return (
    <div>
      <Video url={playbackUrl} />
    </div>
  );
}
