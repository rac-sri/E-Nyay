import axios from "axios";

let media_number = 0;

const onStream = (broadcaster_address, stream_id, ref) => {
  window.navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
    })
    .then((stream) => {
      // display stream in the user's own browser
      if ("srcObject" in ref) {
        console.log(stream);
        ref.srcObject = stream;
      } else {
        // old version
        ref.src = window.URL.createObjectURL(stream);
      }

      ref.onloadedmetadata = (e) => ref.play();

      // for recording the
      let mediaRecorder = new MediaRecorder(stream);

      axios({
        url: `${broadcaster_address}/live/${stream_id}/${media_number}.ts`,
        method: "post",
      });
      media_number++;
    });
};

export default onStream;
