import React, {useContext} from "react";
import styles from "../../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import axios from "axios";
import UseUser from "../../hooks/UseUser";
import UseChat from "../../hooks/UseChat";
import UseSocket from "../../hooks/UseSocket";
import SocketContext from "../../context/context-socketio";
import {
  faBookOpen,
  faCog,
  faHeart,
  faRocket,
  faSignOutAlt,
  faTachometerAlt,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

// handleClick = async (e) => {
//   e.preventDefault();
//   await axios.post("http://localhost:4000/api/tienda/logout", {
//     withCredentials: true,
//   });
//   router.push("/");
// };

function LeftNavbar() {
  const router = useRouter();
  const user = UseUser();
  const {setSocket, Socket} = useContext(SocketContext);;
  const handleClicLogOut = async () => {
    await axios
      .delete(
        "http://localhost:4000/api/tienda/logout",
        { withCredentials: true }
      )
      .then((response) => {
        user.cambiarContexto(false, false);
        Socket.disconnect();
        console.log('cambiartexto ejecutado')
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
  return (
    <div className={styles.navcontainer}>
      <div className={styles.logo}>
        <h2></h2>
      </div>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <Link href="/graficos">
              <a>Graficos</a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faRocket}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <Link href="/admin/categorias">
              <a>Categorias</a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faBookOpen}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <Link href="/admin/ventas">
              <a>Ventas</a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faMessage}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a href="#">Chat</a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faUser}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a href="#"> Perfil</a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a href="/"></a>
            <a href="#" onClick={handleClicLogOut}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftNavbar;
