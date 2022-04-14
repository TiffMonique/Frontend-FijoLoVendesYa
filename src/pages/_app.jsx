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
import ChatContext from "../context/ChatContext";
import UseChat from "../hooks/UseChat";
import React from "react";
import { useState, useEffect } from "react";
import io from 'socket.io-client';
    
function MyApp({ Component, pageProps }) {
  const userI = {
    logged: false,
    admin: false,
    cambiarContexto: (logged, admin) => {
      userI.logged = logged;
      userI.admin = admin;
    },
  };
  const chatI = {
    socketIO: {},
    chats: [],
    enviarMensaje: (idChat, mensaje) => {},
    conectar: () => {
        ChatContext.socketIO = io('http://localhost:4000');
    }
  };
  const [user, setUser] = useState(userI);
  const [chat, setChat] = useState(chatI);
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
        console.log(user);
        user.cambiarContexto(logged==true, admin==true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={user}>
      {/* <ChatContext.Provider value={chat}> */}
        <>
          <Component {...pageProps} />
          <NormalizerStyled />
        </>
      {/* </ChatContext.Provider> */}
    </UserContext.Provider>
  );
}

export default MyApp;
