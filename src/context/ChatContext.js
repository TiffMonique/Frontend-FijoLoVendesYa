import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
//let socket = 
const ChatContext = createContext({
    socketIO: {},
    chats: [],
    enviarMensaje: (idChat, mensaje) => {},
    conectar: () => {
        ChatContext.socketIO = io('http://localhost:4000');
    }
})


export default ChatContext;
/*export function ContextSocketProvider({children}) {
    const [Socket, setSocket] = useState(null);
    useEffect(() => {
        const SOCKET_URI = 'ws://localhost:4000';
        const socket = client(SOCKET_URI)
        setSocket(socket);
    }, []);
    
    return <Context.Provider value={Socket}>
        {children}
    </Context.Provider>
}*/