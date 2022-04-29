import io from "socket.io-client";
const SOCKET_URI = "ws://localhost:4000"
export const socket = io(SOCKET_URI, {withCredentials: true});