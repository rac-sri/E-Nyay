import axios from "axios";

const renditionProfile = {
  name: "my-stream",
  profiles: [
    {
      name: "1080p",
      bitrate: 6000000,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      name: "720p",
      bitrate: 2000000,
      fps: 30,
      width: 1280,
      height: 720,
    },
    {
      name: "360p",
      bitrate: 500000,
      fps: 30,
      width: 640,
      height: 360,
    },
  ],
};

const createStream = async () => {
  const data = await axios({
    method: "post",
    url: "https://livepeer.com/api/stream",
    data: renditionProfile,
    headers: {
      Authorization: "Bearer 52274c76-f3a0-423d-8b4c-4e942c54119e",
      "Content-Type": "application/json",
    },
  });
  return data;
};

export default createStream;
