import { createContext, useState, } from 'react';
const Context = createContext({});

export function ContextChatProvider({children}){
    let [chats, setChats] = useState([])
    let [nuevo, setNuevo] = useState(false);
    const concatenar = (msg)=> {
        console.log('concatenar', msg);
        const a = chats.slice();
        a.concat("a");
        setChats(a);
    }
    return <Context.Provider value={{chats, setChats, concatenar, nuevo, setNuevo}}>
        {children}
    </Context.Provider>
}

export default Context;