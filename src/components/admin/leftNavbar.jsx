import React from "react";
import styles from "../../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import UseUser from '../../hooks/UseUser';
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
import { useRouter } from "next/router";
import Link from "next/link";

function LeftNavbar() {
  const router = useRouter();
  const user = UseUser();
  const handleClicLogOut = async () => {
    await axios
      .delete(
        "http://localhost:4000/api/tienda/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        user.cambiarContexto(false, false);
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
          text: err.response.data.message,
          icon: "error",
          button: "Aceptar",
          timer: "1500",
        });
      });
  }
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
            <a href="#" onClick={handleClicLogOut}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftNavbar;
