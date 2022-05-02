import Link from "next/link";
import { StyledFooterContainer } from "./styled";

const Footer = () => {
  return (
    <StyledFooterContainer>
      <div className="container">
        <img className="logo" src="/images/logo.jpg" />

        <ul className="ul">
          <li className="li">
            <Link href="/">Inicio</Link>
          </li>
          <li className="li">
            <Link href="/login">Ingresar</Link>
          </li>
          <li className="li">
            <Link href="/register">Registrarse</Link>
          </li>
        </ul>
      </div>
    </StyledFooterContainer>
  );
};

export default Footer;
