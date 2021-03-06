import Link from "next/link";
import { StyledMainContainer } from "./styled";
import ContextSocket from "../../../context/context-socketio";
import ContextChat from "../../../context/ChatContext";
import UserContext from "../../../context/UserContext";
import UseUser from "../../../hooks/UseUser";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
const Main = ({ children }) => {
  const {chats, setChats, } = useContext(ContextChat);
  const {Socket, conectar, } = useContext(ContextSocket);
  const user = useContext(UserContext);
  var router = useRouter();
  useEffect(() => {
    
    if (user.logged) {
      if (Socket) {
        const handler = (msg) => {
          setChats([...chats, msg])
        }
        const handlerMischats = (chats) => {
          const chatsOrdenado = ordenarChats(chats);
          setChats(chatsOrdenado)
        }
        const mensajenuevo = (msg) => {
          var chatsNevo = chats.slice();
          const i = chatsNevo.findIndex((chat)=>chat.idChat==msg.idChat);
          const mensajes = chatsNevo[i].mensajes.slice();
          chatsNevo[i].sinleer = true;
          mensajes.push(msg);
          chatsNevo[i].mensajes = mensajes;
          const chatsOrdenado = ordenarChats(chatsNevo);
          setChats(chatsOrdenado);
        }
        const nuevochat = (chat) => {
          const copiachat = {...chat, mensajes: []};
          const copiachats = chats.slice();
          copiachats.push(copiachat);
          setChats(copiachats);
        }
        Socket.on("pruebaregreso", handler);
        Socket.on("mischats", handlerMischats/* (msg) => console.log(msg) */);
        Socket.on("mensajenuevo", mensajenuevo);
        Socket.on("nuevochat", nuevochat);
        return () => { 
          Socket.off("pruebaregreso")
          Socket.off("mischats")
          Socket.off("mensajenuevo")
          Socket.off("nuevochat")
        }; 
      } else {
        conectar()
      }
    }
  }, [chats, Socket, user]);
  const ordenarChats = (chats)=> {
    const chatsordenado = chats.sort((chat1, chat2)=>{
      if(chat1.mensajes.length>0 && chat2.mensajes.length>0) {
        if(chat1.mensajes[chat1.mensajes.length-1].idMensaje == chat2.mensajes[chat2.mensajes.length-1].idMensaje) {
          return 0;
        } else {
          return chat2.mensajes[chat2.mensajes.length-1].idMensaje - chat1.mensajes[chat1.mensajes.length-1].idMensaje;
        }
      }
      return 0;
    })
    return chatsordenado;
  }
  return <StyledMainContainer>{children}</StyledMainContainer>;
};

export default Main;

