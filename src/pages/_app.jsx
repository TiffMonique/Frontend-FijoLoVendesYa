import NormalizerStyled from "../styles/normalize";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/css/bootstrap-grid.css";
import "../styles/css/font-awesome.min.css";
import "../styles/css/font.css";
import "../styles/css/App.css";
import "bootstrap/dist/css/bootstrap.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../src/components/SliderHome/styles.css";
import "../../src/components/carousel/CarouselDemo.css";
import "../../src/components/carousel/index.css";
import "../../src/components/dataview/DataViewDemo.css";
import "../../src/components/dataview/index.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../components/carousel/CarouselDemo.css";
import  axios  from "axios";
//importacion de panelMenu
import "../components/PanelMenu/panelMenu.css";
import UserContext from "../context/UserContext";
import React from "react";
import { useState, useEffect, useContext } from "react";
import io from 'socket.io-client';
import { ChargingStation } from "@mui/icons-material";
import { ContextSocketProvider } from "../context/context-socketio";
import ContextSocket from "../context/context-socketio";
import { ContextChatProvider } from "../context/ChatContext";
function MyApp({ Component, pageProps }) {
  const userI = {
    logged: false,
    admin: false,
    cambiarContexto: (logged, admin, idSesion) => {
      userI.logged = logged;
      userI.admin = admin;
      userI.idSesion = idSesion
    },
  };
  const [user, setUser] = useState(userI);
  const [chat, setChat] = useState([]);
  var {conectar} = useContext(ContextSocket);
  /*
  const socketI = {
    socketIO: io('http://localhost:4000', {withCredentials:true}),
     conectar: () => {
        const socket =;
        socket.on('pruebaregreso', async(msg) => {
          console.log('chats', chat);
          setChat(['msg']);
        })
        socketI.socketIO =  socket;
    } 
  };*/
  /*socketI.socketIO.on('pruebaregreso', async(msg) => {
    console.log('chats', chat);
    const chat2 = chat.slice();
    chat2.push(msg);
    setChat(chat2);
  })*/
  //const [socket, setSocket] = useState(socketI);
  /*socketI.socketIO.on('pruebaregreso', (msg) => {
    console.log(msg);
    const chats = chat.slice();
    chats.push(msg);
    setChat(chats);
  })*/

  
  useEffect(async() => {
    setUsuario();
    
  }, []);
  

  const setUsuario = async() => {
    const response = await axios
      .get(
        "http://localhost:4000/api/tienda/sesion", {withCredentials:true}
      )
      .then((response) => {
        const admin = response.data.admin;
        const logged = response.data.logged;
        const idSession = response.data.idSesion
        setUser({logged:logged==true, admin: admin==true, idSession})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={user}>
      <ContextChatProvider>
        <ContextSocketProvider>
          <>
            <Component {...pageProps} />
            <NormalizerStyled />
          </>
        </ContextSocketProvider>
      </ContextChatProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
