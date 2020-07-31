import React, { useRef } from "react";
import livestream from "../functionalities/livestream";
import getList from "../functionalities/getBroadcaster";
import createStream from "../functionalities/createStream";

export default function CommunicationPage() {
  const videoRef = useRef();

  const startStream = async () => {
    console.log(videoRef.current);
    const broadcaster = await getList();
    const streamId = "gzbp-vfce-l1ax-4be9";
    livestream(broadcaster, streamId, videoRef.current);
  };
  return (
    <div>
      <video ref={videoRef} className="personalVideo" />
      <button onClick={startStream}>Stream</button>
    </div>
  );
}
