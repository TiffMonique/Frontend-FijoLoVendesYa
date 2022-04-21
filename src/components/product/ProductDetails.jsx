import React from "react";
import styled from "@emotion/styled";
import GalleryProduct from "./GalleryProduct";
import { Icon, _api } from "@iconify/react";
import { ProductService } from "../../service/ProductService";
import { StarRatingDemo, StarRating } from "./Rate";
import Rate from "./Rate";
//import { FancyButton } from "./Buttom";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Container = styled.div`
  //max-width: 1940px;
  margin-left: 100px;
  margin-right: auto;
  display: flex;
  flex-direction: row;

  .columWidth {
    width: 735px;
  }
`;

const Colum1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const Colum2 = styled.div`
  margin-left: 35px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductDetails = (data) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const [calificacion, setCalificacion] = useState(0);
  const stars = Array(5).fill(0);
  const [idUsuario, setIdUsuario] = useState("");
  const [estado, setEstado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [fotos, setFotos] = useState([]);
  const [idVenta, setIdVenta] = useState("");

  const Rating = () => {
    const [rating, setRating] = useState(0);
    const [rating2, setRating2] = useState(0);
    return (
      <>
        <div className="row">
          <Rate rating={rating} onRating={(rate) => setRating(rate)} />
          <p>Rating - {rating}</p>
          {/* <Rate rating={rating2} onRating={(rate) => setRating2(rate)} />
            <p>Rating - {rating2}</p> */}
        </div>
      </>
    );
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  useEffect(async () => {
    const location = window.location.href.split("/");
    const id = location[location.length - 1];
    const response = await fetch(
      "http://localhost:4000/api/tienda/buscarVenta/" + id
    );
    const data = await response.json();
    setCategoria(data.categoria);
    setProducto(data.producto);
    setCantidad(data.cantidad);
    setDescripcion(data.descripcion);
    setEstado(data.estado);
    setPrecio(data.precio);
    setFechaPublicacion(data.fechaPublicacion);
    setFotos(data.fotos);
    console.log(data);
  }, []);

  return (
    <div>
      <div className="row f-flex justify-content-around">
        <Container>
          <Colum1 className="columWidth">
            <GalleryProduct fotos={fotos} />
          </Colum1>

          <Colum2>
            <div className="col-12 col-lg-7 mt-7">
              <h3>{producto}</h3>
              <p id="product_id">{producto}</p>

              {/* <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">(Porcentaje)</span> */}
            </div>
            <hr />
            <p id="product_price">L. {precio}</p>
            <hr />
            Estado: <span id="stock_status">{estado}</span>
            <p></p>
            <hr />
            <h4 className="mt-2">Descripcion:</h4>
            <p>{descripcion}</p>
            <hr />
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
            >
              Contactar Vendedor
            </button>
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
            >
              <Icon icon="ant-design:heart-outlined" color="#fff" height="25" />{" "}
              Agregar a Favoritos
            </button>
            <hr />
            <div style={styles.container}>
              <h2> Calificacion </h2>

              <div style={styles.stars}>
                <Rating />
              </div>

              {/* <div style={styles.stars}>
                {stars.map((_, index) => {
                  return (
                    <div>
                      <FaStar
                        count={5}
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <textarea
                placeholder="Como ha sido su experiencia?"
                style={styles.textarea}
              />

              <button style={styles.button}>Enviar</button> */}
              {/* <FancyButton
              suscrito={categoria.suscrito}
              nombre={categoria.nombre}
              setSuscripcion={setSuscripcion}
            /> */}
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Enviar
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Colum2>
        </Container>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default ProductDetails;
