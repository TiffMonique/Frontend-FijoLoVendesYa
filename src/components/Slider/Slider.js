import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "./prueba.js";
import { button } from "../button/index.jsx";
import { FancyButton } from "./BotonP.js";

function ImageSlider() {
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
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img id="img1" src="/images/1.jpg" />
          </div>
          <ul className="social-icons">
            <button />
          </ul>
          <div className="details">
            <h2>
              INMUEBLES <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img id="img2" src="/images/2.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              VEHICULOS <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/3.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              HOGAR<span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/4.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              MODA <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/5.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              FUTUROS PADRES <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/6.png" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              MASCOTAS <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/7.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              ELECTRONICA <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/8.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              SERVICIOS <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/9.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              EMPLEOS <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src="images/10.jpg" />
          </div>
          <ul className="social-icons"></ul>
          <div className="details">
            <h2>
              NEGOCIOS <span className="job-title"></span>
            </h2>
            <FancyButton />
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default ImageSlider;

//... is called spread operator

//thanks for watching
//pleae subscribe my channel
