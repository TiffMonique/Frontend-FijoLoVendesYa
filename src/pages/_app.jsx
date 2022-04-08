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
import "../../src/components/SliderHome/styles.css";
import "../../src/components/carousel/CarouselDemo.css";
import "../../src/components/carousel/index.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../components/carousel/CarouselDemo.css";

//importacion de panelMenu
import "../components/PanelMenu/panelMenu.css";
import {usuarioContext} from '../contexto';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <usuarioContext.provider value = {usuarioContext}>
      <>
        <Component {...pageProps} />
        <NormalizerStyled />
      </>
    </usuarioContext.provider>
    
  );
}

export default MyApp;
