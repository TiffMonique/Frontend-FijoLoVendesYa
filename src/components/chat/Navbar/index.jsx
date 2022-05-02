import Link from "next/link";
import { useRouter } from "next/router";
import { StyledNavbarContainer } from "./styled";
import { Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import ContextUser from "../../../context/UserContext";
import ContextChat from "../../../context/ChatContext";
import {
  BiMessageRounded,
  BiMessageRoundedError,
  BiUser,
  BiHeart,
  BiShoppingBag,
} from "react-icons/bi";

const Navbar = () => {
  const user = useContext(ContextUser);
  const router = useRouter();
  const { chats, sinleer, setsinleer } = useContext(ContextChat);
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
  return (
    <StyledNavbarContainer>
      <div className="container">
        <Link href="/">
          <img className="logo" src="/images/logo.jpg" />
        </Link>

        <div className="content">
          <ul className="ul">
            <li className="li">
              <Link href="/HomeUser">
                <BiShoppingBag size="30" />
              </Link>
            </li>

            <li className="li">
              {sinleer ? (
                <Link href="">
                  <BiMessageRoundedError size="30" />
                </Link>
              ) : (
                <Link href="">
                  <BiMessageRounded size="30" />
                </Link>
              )}
            </li>
            <li className="li">
              <Link href="/user/favoritos">
                <BiHeart size="30" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </StyledNavbarContainer>
  );
};

export default Navbar;
