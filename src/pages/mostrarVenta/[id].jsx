import axios from "axios";
import { useState, useEffect, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import NavAndFooter from "../../components/User/NavAndFooter";
const URI = "http://localhost:4000/api/tienda/crearVenta/";
import UseChat from "../../hooks/UseChat";
import ContextSocket from "../../context/context-socketio";
import ContextChat from "../../context/ChatContext";
import UseUser from "../../hooks/UseUser";
function CompRegistrarVentas() {
  useEffect(() => {
    buscarVenta();
  }, []);
  const {chats, setChats, } = useContext(ContextChat);
  const {Socket, conectar, desconectar} = useContext(ContextSocket);
  const user = UseUser();
  console.log('user state', user);
  const buscarVenta = async (e) => {
    const location = window.location.href.split('/');
    const id = location[location.length-1];
    const response = await fetch(
      "http://localhost:4000/api/tienda/buscarVenta/"+id
    );
    const data = await response.json();
    setCategoria(data.categoria);
    setProducto(data.producto);
    setCantidad(data.cantidad);
    setDescripcion(data.descripcion);
    setPrecio(data.precio);
    setFechaPublicacion(data.fechaPublicacion);
    setFotos(data.fotos);
  };

  useEffect(() => {
    if (user.logged) {
      if (Socket) {
        console.log('user');
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

  const pruebaSocketmsg = async() => {
    console.log("Pruebasocket");
    Socket.emit('prueba', "Prueba Chat"); 
  }

  const pruebaconectar = async() => {
    Socket.emit('chat', "mensaje")
    console.log("Prueba chat");
  }
  
  const pruebadesconectar = async() => {
    desconectar();
    console.log("Prueba desconectar");
  }
  
  

  const [idUsuario, setIdUsuario] = useState("");
  const [estado, setEstado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [fotos, setFotos] = useState([]);

  

  return (
    <NavAndFooter>
      
      <form  id="form" className="insertarVentas">
        <h1 className="centrarTitulo">{producto}</h1>
        <div className="mb-3">
          <label className="form-label">Cantidad Disponible:</label>
          {cantidad}
        </div>
        <div className="mb-3">
          <label className="form-label">Descripcion</label>
          <p>{descripcion}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <h2>{categoria}</h2>
        </div>
        <div className="mb-3">
          <label className="form-label">Precio: </label>
          L.{precio}
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de publicación: </label>
          {fechaPublicacion}
        </div>
        <div className="mb-3">
          <label className="form-label">Fotos</label>
         <div>
          {fotos.map((foto)=>{
            return(
            <span key={foto}>
              <img src={`http://localhost:4000/uploads/${foto}`} height="200px"></img>
            </span>)
          })}
          
         </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={pruebaSocketmsg}>
          Prueba
        </button>
        <button type="button" className="btn btn-primary" onClick={pruebaconectar}>
          Pruebachat
        </button>
        <button type="button" className="btn btn-primary" onClick={pruebadesconectar}>
          Desconectar
        </button>
      </form>
       <div>
          <ul>
            {
              chats.map((mensaje, indice) => {
                return (
                  <li key={indice}>{mensaje}</li>
                )
              })
            }
          </ul>
          
        </div> 
    </NavAndFooter>
  );
};

export default CompRegistrarVentas;
