import axios from "axios";

const getList = async () => {
  const data = await axios({
    url: "https://livepeer.com/api/broadcaster",
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });
  return data.data[0].address;
};

export default getList;
