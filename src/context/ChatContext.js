import { createContext, useState, } from 'react';
const Context = createContext({});

export function ContextChatProvider({children}){
    let [chats, setChats] = useState([])
    let [sinleer, setsinleer] = useState(false);
    const concatenar = (msg)=> {
        console.log('concatenar', msg);
        const a = chats.slice();
        a.concat("a");
        setChats(a);
    }
    return <Context.Provider value={{chats, setChats, concatenar, sinleer, setsinleer}}>
        {children}
    </Context.Provider>
}

export default Context;