import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../button";
import { StyledNavbarContainer } from "./styled";
import { Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {
  BiMessageRounded,
  BiUser,
  BiHeart,
  BiShoppingBag,
} from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
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
              <Link href="/chat/">
                <BiMessageRounded size="30" />
              </Link>
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
