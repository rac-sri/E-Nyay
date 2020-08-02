import React, { useState, useEffect } from "react";
import VideoPlayer from "./videoPlayer";
import socket from "../functionalities/socket";

export default function Panel({ roomId }) {
  const [urls, updateUrls] = useState([]);

  const action = (data) => {
    console.log(data);
    updateUrls(data);
  };
  useEffect(() => {
    socket.emit("fetchData", roomId);
  }, []);
  socket.on("dataStream", action);
  socket.on("judgeStream", action);
  socket.on("concernedPartyStream", action);
  socket.on("lawyersStream", action);

  return (
    <div>
      {urls.map((value, index) => (
        <VideoPlayer playbackUrl={value} key={index} />
      ))}
      {/* <div className="lawyers">
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
      </div>
      <div className="concernedParties">
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
      </div>{" "}
      <div className="judge">
        <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/s7um87jj4uuz6k9d/index.m3u8" />
      </div> */}
    </div>
  );
}
