import { createContext, useState, } from 'react';
const Context = createContext({});

export function ContextChatProvider({children}){
    let [chats, setChats] = useState([])
    const concatenar = (msg)=> {
        console.log('concatenar', msg);
        const a = chats.slice();
        a.concat("a");
        setChats(a);
    }
    return <Context.Provider value={{chats, setChats, concatenar}}>
        {children}
    </Context.Provider>
}

export default Context;