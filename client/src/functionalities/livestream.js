const axios from 'axios';

let media_number = 0;

const onStream = ({broadcaster_address,stream_id})=>{
    window.navigator.getUserMedia({video:true,audio:true})
    .then(stream=>{
        axios.post(`${broadcaster_address}/live/${stream_id}/${media_number}.ts`);
        media_number++;
    });   
}

module.export = onStream;