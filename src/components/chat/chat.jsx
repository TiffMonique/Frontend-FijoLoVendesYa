import React from "react";
import ContextSocket from "../../context/context-socketio";
import ContextChat from "../../context/ChatContext";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
//
import Nabvar from "./Navbar";

const chat = () => {
  const router = useRouter();
  const { chats, setChats } = useContext(ContextChat);
  var [buscaChats, setBuscaChats] = useState([]);
  const { Socket, conectar } = useContext(ContextSocket);
  const [chatActual, setchatActual] = useState({});
  const [campoMensaje, setCampoMensaje] = useState("");
  const [campoBusqueda, setCampoBusqueda] = useState("");
  const user = useContext(UserContext);

  const buscarChats = (e) => {
    console.log("buscarchats");
    setCampoBusqueda(e.target.value);
    if (campoBusqueda) {
      console.log("campoBusqueda");
      const buscar = chats.filter(
        (chat) =>
          chat.nombreContacto
            .toUpperCase()
            .includes(campoBusqueda.toUpperCase()) ||
          chat.apellidoContacto
            .toUpperCase()
            .includes(campoBusqueda.toUpperCase())
      );
      console.log(buscar);
      setBuscaChats(buscar);
    } else {
      setBuscaChats([]);
    }
  };

  useEffect(() => {
    if (user.logged) {
      if (Socket) {
        const handler = (msg) => {
          setChats([...chats, msg]);
        };
        const handlerMischats = (chats) => {
          const chatsOrdenado = ordenarChats(chats);
          setChats(chatsOrdenado);
        };
        const mensajenuevo = (msg) => {
          var chatsNevo = chats.slice();
          const i = chatsNevo.findIndex((chat) => chat.idChat == msg.idChat);
          const mensajes = chatsNevo[i].mensajes.slice();
          if(chatActual){
            if(chatsNevo[i].idChat!=chatActual.idChat){
              chatsNevo[i].sinleer = true;
            }else {
              if(msg.idUsuario!=user.idUsuario){
                Socket.emit("confLectura", {idChat: msg.idChat})
              }
            }
          }
          mensajes.push(msg);
          chatsNevo[i].mensajes = mensajes;
          const chatsOrdenado = ordenarChats(chatsNevo);
          setChats(chatsOrdenado);
          router.push("#" + msg.idMensaje);
        };
        const nuevochat = (chat) => {
          const copiachat = { ...chat, mensajes: [] };
          const copiachats = chats.slice();
          copiachats.push(copiachat);
          setChats(copiachats);
        };
        Socket.on("pruebaregreso", handler);
        Socket.on("mischats", handlerMischats /* (msg) => console.log(msg) */);
        Socket.on("mensajenuevo", mensajenuevo);
        Socket.on("nuevochat", nuevochat);
        return () => {
          Socket.off("pruebaregreso");
          Socket.off("mischats");
          Socket.off("mensajenuevo");
          Socket.off("nuevochat");
        };
      } else {
        conectar();
      }
    }
  }, [chats, Socket, user]);

  const ordenarChats = (chats) => {
    const chatsordenado = chats.sort((chat1, chat2) => {
      if (chat1.mensajes.length > 0 && chat2.mensajes.length > 0) {
        if (
          chat1.mensajes[chat1.mensajes.length - 1].idMensaje ==
          chat2.mensajes[chat2.mensajes.length - 1].idMensaje
        ) {
          return 0;
        } else {
          return (
            chat2.mensajes[chat2.mensajes.length - 1].idMensaje -
            chat1.mensajes[chat1.mensajes.length - 1].idMensaje
          );
        }
      }
      return 0;
    });
    return chatsordenado;
  };

  const handleClicChat = (idChat) => {
    var chat = chats.find((chat) => chat.idChat == idChat);
    const chatscopia = chats.slice();
    const i = chatscopia.findIndex((chat)=>chat.idChat==idChat);
    if(chatscopia[i].sinleer){
      Socket.emit("confLectura", {idChat:idChat})
    }
    chatscopia[i].sinleer=false;
    var mensajes = chat.mensajes.slice();
    chat.mensajes = mensajes;
    setChats(chatscopia)
    setchatActual(chat);
  };

  const handleSend = () => {
    if (campoMensaje && chatActual.mensajes) {
      Socket.emit("mensaje", {
        idChat: chatActual.idChat,
        mensaje: campoMensaje,
        tipo: "texto",
      });
      setCampoMensaje("");
    }
  };

  const handleVer = (idVentaa) => {
    router.push("/product/" + idVentaa);
  };

  function ago(v) {
    v = 0 | ((Date.now() - v) / 1e3);
    var a,
      b = {
        segundo: 60,
        minuto: 60,
        hora: 24,
        día: 7,
        semana: 4.35,
        mes: 12,
        año: 1e4,
      },
      c;
    for (a in b) {
      c = v % b[a];
      if (!(v = 0 | (v / b[a]))) return c + " " + (c - 1 ? a + "s" : a);
    }
  }

  return (
    <div>
      <Nabvar />
      <div className="container">
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-5 px-0">
            <div className="bg-white">
              <div className="row heading">
                <div className="col-sm-3 col-xs-3 heading-avatar">
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                    alt="user"
                    width="50"
                    className="rounded-circle"
                  />
                  {/* <div class="col-sm-8 col-xs-7 heading-name">
                    <a class="heading-name-meta">John Doe</a>
                    <span class="heading-online">Online</span>
                  </div> */}
                </div>
                <div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                  <i
                    className="fa fa-ellipsis-v fa-2x  pull-right"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div class="row searchBox">
                <div class="col-sm-12 searchBox-inner">
                  <div class="form-group has-feedback">
                    <input
                      id="searchText"
                      type="text"
                      class="form-control"
                      name="searchText"
                      placeholder="Search"
                      value={campoBusqueda}
                      onChange={(e) => buscarChats(e)}
                    />
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                  </div>
                </div>
              </div>
              <div className="messages-box">
                <div className="list-group rounded-0">
                  {campoBusqueda
                    ? buscaChats.map((chat) => {
                        return (
                          <a
                            key={chat.idChat}
                            href={
                              "#" +
                              chat.mensajes[chat.mensajes.length - 1].idMensaje
                            }
                            onClick={() => {
                              handleClicChat(chat.idChat);
                            }}
                            className={
                              chat.idChat == chatActual.idChat
                                ? "list-group-item list-group-item-action active text-white rounded-0"
                                : "list-group-item list-group-item-action list-group-item-light rounded-0"
                            }
                          >
                            <div className="media">
                              <img
                                src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                                alt="user"
                                width="50"
                                className="rounded-circle"
                              />
                              <div className="media-body ml-4">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                  <h6 className="mb-0">
                                    {chat.nombreContacto}{" "}
                                    {chat.apellidoContacto}
                                  </h6>
                                  <small className="small font-weight-bold">
                                    {chat.mensajes[0] ? (
                                      ago(
                                        new Date(
                                          chat.mensajes[
                                            chat.mensajes.length - 1
                                          ].fecha
                                        ).getTime()
                                      )
                                    ) : (
                                      <></>
                                    )}
                                  </small>
                                </div>
                                <p className="font-italic text-muted mb-0 text-small">
                                  {chat.mensajes[0]
                                    ? chat.mensajes[
                                        chat.mensajes.length - 1
                                      ].mensaje.substr(0, 20) +
                                      (chat.mensajes[chat.mensajes.length - 1]
                                        .mensaje.length > 20
                                        ? "..."
                                        : "")
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })
                    : chats.map((chat) => {
                        return (
                          <a
                            key={chat.idChat}
                            href={
                              chat.mensajes
                                ? chat.mensajes[0]
                                  ? "#" +
                                    chat.mensajes[chat.mensajes.length - 1]
                                      .idMensaje
                                  : ""
                                : ""
                            }
                            onClick={() => {
                              handleClicChat(chat.idChat);
                            }}
                            className={
                              (chat.sinleer)?
                              "list-group-item list-group-item-success rounded-0"
                              :
                              (chat.idChat == chatActual.idChat 
                                ? "list-group-item list-group-item-action active text-white rounded-0"
                                : "list-group-item list-group-item-action list-group-item-light rounded-0")
                            }
                          >
                            <div className="media">
                              <img
                                src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                                alt="user"
                                width="50"
                                className="rounded-circle"
                              />
                              <div className="media-body ml-4">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                  <h6 className="mb-0">
                                    {chat.nombreContacto}{" "}
                                    {chat.apellidoContacto}
                                  </h6>
                                  <small className="small font-weight-bold">
                                    {chat.mensajes[0] ? (
                                      ago(
                                        new Date(
                                          chat.mensajes[
                                            chat.mensajes.length - 1
                                          ].fecha
                                        ).getTime()
                                      )
                                    ) : (
                                      <></>
                                    )}
                                  </small>
                                </div>
                                <p className="font-italic text-muted mb-0 text-small">
                                  {chat.mensajes[0]
                                    ? chat.mensajes[chat.mensajes.length - 1]
                                        .tipo == "venta"
                                      ? "Venta"
                                      : chat.mensajes[
                                          chat.mensajes.length - 1
                                        ].mensaje.substr(0, 20) +
                                        (chat.mensajes[chat.mensajes.length - 1]
                                          .mensaje.length > 20
                                          ? "..."
                                          : "")
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-7 px-0">
            <div className="bg-gray px-4 py-2 bg-light hola">
              <div className="col-sm-3 col-xs-3 heading-avatar">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div class="col-sm-8 col-xs-7 heading-name">
                  <a class="heading-name-meta">
                    {chatActual.nombreContacto} {chatActual.apellidoContacto}
                  </a>
                  {/* <span class="heading-online">Onlineeeeeeeeeeeeeeeeee</span> */}
                </div>
              </div>
            </div>
            <div className="px-4 py-5 chat-box bg-white">
              {chatActual.mensajes ? (
                chatActual.mensajes.map((mensaje) => {
                  if (mensaje.idUsuario != user.idUsuario) {
                    if (mensaje.tipo == "texto") {
                      return (
                        <div
                          className="media w-50 mb-3"
                          key={mensaje.idMensaje}
                          id={mensaje.idMensaje}
                        >
                          <img
                            src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                            alt="user"
                            width="50"
                            className="rounded-circle"
                          />
                          <div className="media-body ml-3">
                            <div className="bg-light rounded py-2 px-3 mb-2">
                              <p className="text-small mb-0 text-muted">
                                {mensaje.mensaje}
                              </p>
                            </div>
                            <p className="small text-muted">
                              {ago(new Date(mensaje.fecha).getTime())}
                            </p>
                          </div>
                        </div>
                      );
                    } else if (mensaje.tipo == "venta") {
                      return (
                        <div
                          class="antialiased bg-gray-200 font-sans"
                          key={mensaje.idMensaje}
                          id={mensaje.idMensaje}
                        >
                          <div>
                            <div class="max-w-md md:max-w-2xl px-2">
                              <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                                <div class="bg-cover bg-bottom h-56 md:h-auto md:w-56">
                                  <img
                                    src={
                                      "http://localhost:4000/uploads/" +
                                      JSON.parse(mensaje.mensaje).foto
                                    }
                                    width={200}
                                    height={200}
                                  />
                                </div>
                                <div>
                                  <div class="p-4 md:p-5">
                                    <p class="font-bold text-xl md:text-2xl">
                                      {JSON.parse(mensaje.mensaje).producto}
                                    </p>
                                    <p class="text-gray-700 md:text-lg">
                                      {JSON.parse(mensaje.mensaje).descripcion}
                                    </p>
                                  </div>
                                  <div class="p-4 md:p-5 bg-gray-100">
                                    <button
                                      class="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-indigo-700 hover:bg-indigo-600 font-bold text-white md:text-lg rounded-lg shadow-md"
                                      onClick={() => {
                                        handleVer(
                                          JSON.parse(mensaje.mensaje).idVenta
                                        );
                                      }}
                                    >
                                      ver mas
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  } else {
                    if (mensaje.tipo == "texto") {
                      return (
                        <div
                          className="media w-50 ml-auto mb-3"
                          key={mensaje.idMensaje}
                          id={mensaje.idMensaje}
                        >
                          <div className="media-body">
                            <div className="bg-primary rounded py-2 px-3 mb-2">
                              <p className="text-small mb-0 text-white">
                                {mensaje.mensaje}
                              </p>
                            </div>
                            <p className="small text-muted">
                              {ago(new Date(mensaje.fecha).getTime())}
                            </p>
                          </div>
                        </div>
                      );
                    } else if (mensaje.tipo == "venta") {
                      return (
                        <div
                          className="antialiased bg-gray-200 font-sans"
                          key={mensaje.idMensaje}
                          id={mensaje.idMensaje}
                        >
                          <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                            <div className="bg-cover bg-bottom h-56 md:h-auto md:w-56">
                              <img
                                src={
                                  "http://localhost:4000/uploads/" +
                                  JSON.parse(mensaje.mensaje).foto
                                }
                                width={200}
                                height={200}
                              />
                            </div>
                            <div>
                              <div className="p-4 md:p-5">
                                <p className="font-bold text-xl md:text-2xl">
                                  {JSON.parse(mensaje.mensaje).producto}
                                </p>
                                <p className="text-gray-700 md:text-lg">
                                  {JSON.parse(mensaje.mensaje).descripcion}
                                </p>
                              </div>
                              <div className="p-4 md:p-5 bg-gray-100">
                                <button
                                  className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-indigo-700 hover:bg-indigo-600 font-bold text-white md:text-lg rounded-lg shadow-md"
                                  onClick={() => {
                                    handleVer(
                                      JSON.parse(mensaje.mensaje).idVenta
                                    );
                                  }}
                                >
                                  ver mas
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                })
              ) : (
                <></>
              )}
            </div>

            <form action="#">
              <div className="row reply">
                <div className="col-sm-1 col-xs-1 reply-emojis">
                  <i className="fa fa-smile-o fa-2x"></i>
                </div>
                <div className="col-sm-9 col-xs-9 reply-main">
                  <textarea
                    className="form-control"
                    rows="1"
                    id="comment"
                    value={campoMensaje}
                    onChange={(e) => setCampoMensaje(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-sm-1 col-xs-1 reply-recording">
                  <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
                </div>
                <div
                  className="col-sm-1 col-xs-1 reply-send"
                  onClick={handleSend}
                >
                  <i className="fa fa-send fa-2x" aria-hidden="true"></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="container py-5">
        <div class="row justify-content-center mb-3">
          <div class="col-md-12 col-xl-10">
            <div class="card shadow-0 border rounded-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div class="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                        class="w-100"
                      />
                      <a href="#!">
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            // style="background-color: rgba(253, 253, 253, 0.15);"
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-2 col-lg-2 col-xl-2">
                    <h3>Quant olap shirts</h3>

                    <div class="mt-1 mb-0 text-muted small">
                      <span>100% cotton</span>
                    </div>

                    <p class="text-truncate mb-3 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div class="d-flex flex-row align-items-center mb-1">
                      <h4 class="mb-1 me-1">$14.99</h4>
                    </div>

                    <div class="d-flex flex-column mt-4">
                      <button class="btn btn-primary btn-sm" type="button">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chat;
