import React from "react";
import VideoPlayer from "./videoPlayer";

export default function Panel() {
  return (
    <div>
      <div className="lawyers">
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
      </div>
      <div className="concernedParties">
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
      </div>{" "}
      <div className="judge">
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
      </div>
    </div>
  );
}
