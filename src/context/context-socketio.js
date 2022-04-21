import { createContext, useState, useEffect, useContext } from "react";
import client from "socket.io-client";
import ContextChat from "./ChatContext";
const Context = createContext({});

export function ContextSocketProvider({children}){
    const [Socket, setSocket] = useState(null);
    const {chats, setChats}= useContext(ContextChat);
    /* useEffect(() => {
        const SOCKET_URI = "ws://localhost:4000"
        const socket = client(SOCKET_URI);
        
        setSocket(socket);
    }, []); */
    const conectar = async()=> {
        if(!Socket) {
            console.log('conectando')
            const SOCKET_URI = "ws://localhost:4000"
            const socket = await client(SOCKET_URI, {withCredentials: true});
            await setSocket(socket);
        }
    }
    const desconectar = async () => {
        console.log('desconectando');
        setSocket(null);
    }
    return <Context.Provider value={{Socket, setSocket, conectar, desconectar}}>
        {children}
    </Context.Provider>
}

export default Context;