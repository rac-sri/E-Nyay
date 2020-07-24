import axios from "axios";

const getList = async () => {
  const data = await axios.get("https://livepeer.com/api/broadcaster");
  return data;
};

export default getList;
