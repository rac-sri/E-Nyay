import socketClient from "socket.io-client";
const socket = socketClient("localhost:4000");
export default socket;
