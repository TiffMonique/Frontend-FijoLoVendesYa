import React from "react";
import ContextSocket from "../../context/context-socketio";
import ContextChat from "../../context/ChatContext";
import UserContext from "../../context/UserContext";
import { useContext, useEffect } from "react";
//
const chat = () => {
  
  const {chats, setChats, } = useContext(ContextChat);
  const {Socket, conectar, } = useContext(ContextSocket);
  const user = useContext(UserContext);
  useEffect(() => {
    console.log('UseEffect')
    if (user.logged) {
      console.log('logged')
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

  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app ">
            <div id="plist" className="people-list messages-box">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Wilmer </div>
                    <div className="status">
                      <i className="fa fa-circle offline"></i> left 7 mins ago{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix active">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Gerson Castillo</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle online"></i> online{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Alguien mas</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle online"></i> online{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Daniel Ramos</div>
                    <div className="status">
                      <i className="fa fa-circle offline"></i> left 10 hours ago{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar8.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Monique Matamoros</div>
                    <div className="status">
                      <i className="fa fa-circle online"></i> online{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Carmen Carcamo</div>
                    <div className="status">
                      <i className="fa fa-circle offline"></i> offline since Oct
                      28{" "}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#view_info"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                      />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">Gerson Castillo</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                  <div className="col-lg-6 hidden-sm text-right">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-secondary"
                    >
                      <i className="fa fa-camera"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-primary"
                    >
                      <i className="fa fa-image"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-info"
                    >
                      <i className="fa fa-cogs"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-warning"
                    >
                      <i className="fa fa-question"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    <li className="clearfix">
                      <div className="message-data text-right">
                        <span className="message-data-time">
                          10:10 AM, Hoy{" "}
                        </span>
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="avatar"
                        />
                      </div>
                      <div className="message other-message float-right">
                        {" "}
                        Hola Gerson, ¿cómo estás? ¿Cómo va el proyecto?{" "}
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">
                          10:12 AM, Hoy{" "}
                        </span>
                      </div>
                      <div className="message my-message">
                        ¿Nos reunimos Hoy?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">
                          10:15 AM, Hoy{" "}
                        </span>
                      </div>
                      <div className="message my-message">
                        El proyecto ya ha sido terminado y tengo resultados para
                        mostrarles.
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">
                          10:15 AM, Hoy{" "}
                        </span>
                      </div>
                      <div className="message my-message">
                        El proyecto ya ha sido terminado y tengo resultados para
                        mostrarles.
                      </div>
                    </li>
                  </ul>
                  <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter text here..."
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text ">
                          <i className="fa fa-send"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default chat;
