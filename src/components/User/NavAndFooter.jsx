import Navbar from "../User/Navbar";
import Footer from "../User/Footer";
import Main from "../User/main";


const NavAndFooter = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default NavAndFooter;