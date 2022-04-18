import Link from "next/link";
import { StyledMainContainer } from "./styled";
import ContextSocket from "../../../context/context-socketio";
import ContextChat from "../../../context/ChatContext";
import { useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";
const Main = ({ children }) => {
  const {chats, setChats, } = useContext(ContextChat);
  const {Socket, conectar, } = useContext(ContextSocket);
  const user = UserContext();

  useEffect(() => {
    if(user.logged) {
      if (Socket) {
        if(Socket.connected) {
          console.log('admin');
          console.log('si socket')
          const handler = (msg) => {
            setChats([...chats, msg])
            console.log('handler despues de setChats');  
          }
          Socket.on("pruebaregreso", handler)
          return () => { 
            Socket.off("pruebaregreso", handler)
          }; 
        } else {
          Socket.connect();
        }
        
      } else {
        conectar()
      }
    }
  }, [chats, Socket, user]);
  return <StyledMainContainer>{children}</StyledMainContainer>;
};

export default Main;

