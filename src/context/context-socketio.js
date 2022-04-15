import { createContext, useState, useEffect } from "react";
import client from "socket.io-client";
const Context = createContext({});

export function ContextSocketProvider({children}){
    const [Socket, setSocket] = useState(null);
    
    useEffect(() => {
        const SOCKET_URI = "ws://localhost:4000"
        const socket = client(SOCKET_URI);
        setSocket(socket);
    }, []);

    return <Context.Provider value={Socket}>
        {children}
    </Context.Provider>
}