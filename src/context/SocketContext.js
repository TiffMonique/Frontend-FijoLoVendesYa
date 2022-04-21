import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
//let socket = 
const SocketContext = createContext({
    socketIO: {},
    enviarMensaje: (idChat, mensaje) => {},
    conectar: () => {
        ChatContext.socketIO = io('http://localhost:4000');
    }
})


export default SocketContext;