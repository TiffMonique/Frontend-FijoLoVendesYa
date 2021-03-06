import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../button";
import { StyledNavbarContainer } from "./styled";
import { Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import ContextUser from "../../../context/UserContext";
import ContextChat from "../../../context/ChatContext";
import ContextSocket from "../../../context/context-socketio";
import {
  BiMessageRounded,
  BiMessageRoundedError,
  BiUser,
  BiHeart,
  BiShoppingBag,
} from "react-icons/bi";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import { style } from "@mui/system";
import swal from "sweetalert";
const Navbar = () => {
  const user = useContext(ContextUser);
  const { Socket } = useContext(ContextSocket);
  const { chats, sinleer, setsinleer } = useContext(ContextChat);
  const buscar = async (
    categoria,
    busqueda,
    departamento,
    precioMin,
    precioMax
  ) => {
    const URI = "/Busqueda/?";
    if (categoria !== "Elige una Cat") {
      URI = URI + "&categoria=" + categoria;
    }
    if (departamento !== "Elige un Depto") {
      URI = URI + "&departamento=" + departamento;
    }
    if (busqueda !== "") {
      URI = URI + "&busqueda=" + busqueda;
    }
    if (precioMin !== "") {
      URI = URI + "&precioMin=" + precioMin;
    }
    if (precioMax !== "") {
      URI = URI + "&precioMax=" + precioMax;
    }

    await router.push(URI);
    location.reload();
    //then((response) => { console.log(response) })
    /* if (response.data) {
      setBusqueda(response.data);
   */
  };

  const handleClicLogOut = async () => {
    console.log("logout");
    await axios
      .delete("http://localhost:4000/api/tienda/logout", {
        withCredentials: true,
      })
      .then((response) => {
        user.setlogged(false);
        user.setadmin(false);
        user.setidSesion(null);
        if (Socket) {
          Socket.disconnect();
        }
        swal({
          title: "LOGOUT EXITOSO",
          text: response?.data?.message,
          icon: "success",
          button: "Aceptar",
          timer: "1500",
        });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "HA OCURRIDO UN ERROR",
          text: err.message,
          icon: "error",
          button: "Aceptar",
          timer: "1500",
        });
      });
  };
  useEffect(() => {
    var noleido = false;
    chats.forEach((chat) => {
      if (chat.mensajes) {
        if (
          chat.sinleer &&
          chat.mensajes[chat.mensajes.length - 1].idUsuario != user.idUsuario
        ) {
          noleido = true;
        }
      }
    });
    setsinleer(noleido);
  }, [chats]);

  useEffect(() => {
    let query = new URLSearchParams(window.location.href);
    const busqueda = query.get("busqueda");
    if (busqueda) {
      setBusqueda(busqueda);
    }
    setDepartamento("Elige un Depto");
    listacategorias();
    const depto = query.get("departamento");
    if (depto) {
      setDepartamento(depto);
    }
    const category = query.get("categoria");
    if (category) {
      setCategoria(category);
    }
    setPrecioMin("");
    const precioMin = query.get("precioMin");
    if (precioMin) {
      setPrecioMin(precioMin);
    }
    setPrecioMax("");
    const precioMax = query.get("precioMax");
    if (precioMax) {
      setPrecioMax(precioMax);
    }
  }, []);

  const [categorias, setCategorias] = useState([]);

  const listacategorias = async (e) => {
    const response = await fetch(
      "http://localhost:4000/api/tienda/todasCategorias/"
    );
    const data = await response.json();
    const catNueva = { nombre: "Elige una Cat" };
    data.push(catNueva);
    setCategorias(data);
    let query = new URLSearchParams(window.location.href);
    const category = query.get("categoria");
    if (category) {
      setCategoria(category);
    } else {
      setCategoria("Elige una Cat");
    }
  };

  const [categoria, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const router = useRouter();

  return (
    <StyledNavbarContainer>
      <div className="container">
        <Link href="/">
          <img className="logo" src="/images/logo.jpg" />
        </Link>

        <div className="search" style={{ display: "flex", margin: "-10px" }}>
          <Input
            className="item-input"
            placeholder="Search..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);

              console.log(busqueda);
            }}
          />

          <div className="select" style={{ display: "flex", width: "250px" }}>
            <div className="categorias">
              <label className="form-label"></label>
              <select
                name="categoria"
                className="form-control"
                multiple={false}
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value);
                }}
              >
                {categorias.map((elemento) => (
                  <option key={elemento.nombre} value={elemento.nombre}>
                    {elemento.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="departamentos">
              <label className="form-label"></label>

              <select
                className="form-control"
                value={departamento}
                onChange={(e) => {
                  setDepartamento(e.target.value);
                }}
              >
                <option>Elige un Depto</option>
                <option>Yoro</option>
                <option>El Paraiso</option>
                <option>Fco Morazan</option>
                <option>La paz</option>
                <option>Choluteca</option>
                <option>Valle</option>
                <option>Ocotepeque</option>
                <option>Olancho</option>
                <option>Santa Barbara</option>
                <option>Atlantida</option>
                <option>Cortes</option>
                <option>Lempira</option>
                <option>Is Bahia</option>
                <option>Gracias</option>
                <option>Colon</option>
                <option>Comayagua</option>
                <option>Copan</option>
                <option>Intibuca</option>
              </select>
            </div>

            <div className="precio Minimo">
              <label className="form-label"></label>

              <Input
                placeholder="Min"
                value={precioMin}
                onChange={(e) => {
                  setPrecioMin(e.target.value);
                  console.log(precioMin);
                }}
              />
            </div>

            <div className="precio-Maximo">
              <label className="form-label"></label>

              <Input
                className="precio"
                placeholder="Max"
                value={precioMax}
                onChange={(e) => {
                  setPrecioMax(e.target.value);
                  console.log(precioMax);
                }}
              />
            </div>
          </div>
          <div className="boton">
            <button
              onClick={() => {
                buscar(categoria, busqueda, departamento, precioMin, precioMax);
              }}
              type="submit"
              className="buscar"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="content">
          {user.logged ? (
            <ul className="ul">
              <li className="li">
                <Link href="/user/ventas">
                  <BiShoppingBag size="30" />
                </Link>
              </li>

              <li className="li">
                {sinleer ? (
                  <Link href="/chat/">
                    <BiMessageRoundedError size="30" />
                  </Link>
                ) : (
                  <Link href="/chat/">
                    <BiMessageRounded size="30" />
                  </Link>
                )}
              </li>
              <li className="li">
                <a onClick={() => handleClicLogOut()}>
                  <FaSignOutAlt size="30" />
                </a>
              </li>
              <li className="li">
                <Link href="/user/favoritos">
                  <BiHeart size="30" />
                </Link>
              </li>
            </ul>
          ) : (
            <></>
          )}
          {user.logged ? (
            <ul className="ul">
              <li className="li">
                <Link href="/user/ventas">
                  <a className="link">Crear Anuncio</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/">
                  <a className="nolin">o</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/user/ventas/insertarVentas">
                  <a className="link">Publicar Producto</a>
                </Link>
              </li>
            </ul>
          ) : (
            // <div className="loginButtons">
            //   <Button
            //     as="a"
            //     width="120px"
            //     onClick={() => {
            //       router.push("/user/ventas");
            //     }}
            //   >
            //     Crear Anuncio
            //   </Button>
            //   <Button
            //     as="a"
            //     width="120px"
            //     onClick={() => {
            //       router.push("/user/ventas/insertarVentas");
            //     }}
            //   >
            //     Publicar Producto
            //   </Button>
            // </div>
            <ul className="ul">
              <li className="li">
                <Link href="/register">
                  <a className="link">Registrar</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/">
                  <a className="nolin">o</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/login">
                  <a className="link">Iniciar sesi??n</a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </StyledNavbarContainer>
  );
};

export default Navbar;
