import React from "react";
import VideoPlayer from "react-hls";

export default function VideoPlayer({ playbackUrl }) {
  return (
    <div>
      <VideoPlayer url={playbackUrl} />
    </div>
  );
}
