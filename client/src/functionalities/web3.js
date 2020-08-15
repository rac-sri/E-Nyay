import Portis from "@portis/web3"
import Web3 from "web3";

const portis = new Portis("3c4b6f4b-d073-4f20-a06c-a66a9fa6214e", "ropsten");
const web3 = new Web3(portis.provider);

export default web3;
