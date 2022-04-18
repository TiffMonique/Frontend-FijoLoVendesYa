import NormalizerStyled from "../styles/normalize";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/css/bootstrap-grid.css";
import "../styles/css/font-awesome.min.css";
import "../styles/css/font.css";
import "../styles/css/App.css";
import "bootstrap/dist/css/bootstrap.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles

import "swiper/css/free-mode";

import "swiper/css/thumbs";

import "../../src/components/SliderHome/styles.css";
import "../../src/components/carousel/CarouselDemo.css";
import "../../src/components/carousel/index.css";
import "../../src/components/dataview/DataViewDemo.css";
import "../../src/components/dataview/index.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../components/carousel/CarouselDemo.css";

import "../components/product/ProductDetails.css";
import "../components/product/styles.css";

//importacion de panelMenu
import "../components/PanelMenu/panelMenu.css";
import UserContext from "../context/UserContext";
import React from "react";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const userI = {
    logged: false,
    admin: false,
    cambiarContexto: (logged, admin) => {
      userI.logged = logged;
      userI.admin = admin;
    },
  };
  const [user, setUser] = useState(userI);
  return (
    <UserContext.Provider value={user}>
      <>
        <Component {...pageProps} />
        <NormalizerStyled />
      </>
    </UserContext.Provider>
  );
}

export default MyApp;
