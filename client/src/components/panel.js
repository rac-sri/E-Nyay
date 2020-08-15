import React, { useState, useEffect } from "react";
import VideoPlayer from "./videoPlayer";
import socket from "../functionalities/socket";

export default function Panel(props) {
  console.log(props.location.state);
  const { selection, room, url } = props.location.state;

  const [urls, updateUrls] = useState([]);

  const action = (data) => {
    console.log(data);
    updateUrls(data);
  };
  useEffect(() => {
    socket.emit("fetchData", room);
  }, [room]);

  socket.on("dataStream", action);
  socket.on("judgeStream", action);
  socket.on("concernedPartyStream", action);
  socket.on("lawyersStream", action);

  console.log(urls);

  return (
    <div className="panelFlex">
      {/* <VideoPlayer playbackUrl="https://fra-cdn.livepeer.com/hls/gdiyr2qwl6a3607u/index.m3u8" /> */}
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
