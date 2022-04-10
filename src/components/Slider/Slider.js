import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "./prueba.js";
import { button } from "../button/index.jsx";
import { FancyButton } from "./BotonP.js";
import { useState, useEffect } from "react";
import axios from "axios";
const URI = "http://localhost:4000/api/tienda/todasCategorias";
function ImageSlider() {

  const [categ, setCateg] = useState([]);
  useEffect(() => {
    getCategorias();
  }, []);

  //PROCEDIMIENTO PARA OBTENER LAS CATEGORIAS
  const getCategorias = async () => {
    const categorias = await axios.get(URI);
    const suscripciones = await axios.get('http://localhost:4000/api/tienda/missuscripciones', {withCredentials:true})
    categorias = categorias.data.map((categoria) => {
      const suscrito = suscripciones.data.includes(categoria.nombre);
      return {...categoria, suscrito: suscrito}
    });
    setCateg(categorias);
  };

  const setSuscripcion = (suscri, nombre) => {
    console.log(suscri, nombre);console.log("Categ antes:",categ);
    var categorias = categ.slice();
    const indice = categorias.findIndex((categoria) => categoria.nombre == nombre);
    categorias[indice].suscrito = suscri;
    
    setCateg(categorias);
    console.log("Categ despues:",categ);
  }

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>

      {categ.map(
        (categoria) => {
          return (
            <div className="card-wrapper">
              <div className="card">
                <div className="card-image">
                  <img id="img1" src={"http://localhost:4000/uploads/"+categoria.foto} />
                </div>
                <ul className="social-icons">
                  <button />
                </ul>
                <div className="details">
                  <h2>
                    {categoria.nombre} <span className="job-title"></span>
                  </h2>
                  <FancyButton suscrito = {categoria.suscrito} nombre= {categoria.nombre} setSuscripcion = {setSuscripcion}/>
                </div>
              </div>
            </div>
          );
        }
      )}
    </Slider>
  );
}

export default ImageSlider;

//... is called spread operator

//thanks for watching
//pleae subscribe my channel
