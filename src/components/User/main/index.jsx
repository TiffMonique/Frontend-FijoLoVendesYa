import Link from "next/link";
import { StyledMainContainer } from "./styled";
import ContextSocket from "../../../context/context-socketio";
import ContextChat from "../../../context/ChatContext";
import UserContext from "../../../context/UserContext";
import UseUser from "../../../hooks/UseUser";
import { useContext, useEffect } from "react";
const Main = ({ children }) => {
  const {chats, setChats, } = useContext(ContextChat);
  const {Socket, conectar, } = useContext(ContextSocket);
  const user = useContext(UserContext);
  useEffect(() => {
    if (user.logged) {
      if (Socket) {
        console.log('si socket')
        const handler = (msg) => {
          setChats([...chats, msg])
        }
        Socket.on("pruebaregreso", handler)
        return () => { 
          Socket.off("pruebaregreso", handler)
        }; 
      } else {
        conectar()
      }
    }
    
  }, [chats, Socket, user]);
  return <StyledMainContainer>{children}</StyledMainContainer>;
};

export default Main;

