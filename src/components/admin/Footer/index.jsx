import Link from "next/link";
import { StyledFooterContainer } from "./styled";

const Footer = () => {
  return (
    <StyledFooterContainer>
      <div className="container">
        <img className="logo" src="/images/logo.jpg" />

        <ul className="ul">
          <li className="li">
            <Link href="/">Home</Link>
          </li>
          <li className="li">
            <Link href="/login">Login</Link>
          </li>
          <li className="li">
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
    </StyledFooterContainer>
  );
};

export default Footer;
