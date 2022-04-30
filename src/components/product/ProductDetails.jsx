import React from "react";
import styled from "@emotion/styled";
import GalleryProduct from "./GalleryProduct";
import { Icon, _api } from "@iconify/react";
import { ProductService } from "../../service/ProductService";
import { StarRatingDemo, StarRating } from "./Rate";
import Rate from "./Rate";
//import { FancyButton } from "./Buttom";
import Link from "next/link";
import swal from "sweetalert";
import { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import ContextSocket from "../../context/context-socketio";
import ContextUser from "../../context/UserContext";
import { useRouter } from "next/router";
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

  .columWidth2 {
    width: 550px;
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
  const router = useRouter();
  const [idUsuario, setIdUsuario] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const user = useContext(ContextUser);
  const [calificacion, setCalificacion] = useState(0);
  const stars = Array(5).fill(0);
  
  const [estado, setEstado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [fotos, setFotos] = useState([]);
  const [idVenta, setIdVenta] = useState("");
  const {Socket} = useContext(ContextSocket);
  const [rating, setRating] = useState(0);
  const Rating = (props) => {
    const calificar = (rate)=>{
      if(user.logged){
        setRating(rate)
      }
    }
    return (
      <>{(props.user.logged)?
        <div className="row">
          <Rate rating={props.rating} onRating={(rate) => calificar(rate)} />
        </div>:
        <div className="row">
          <Rate rating={props.rating} onRating={() => {}}/>
        </div>}
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
      "http://localhost:4000/api/tienda/buscarVenta/" + id,
      {credentials:"include"}
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
    setIdUsuario(data.Usuario.idUsuarios);
    setIdVenta(data.idVenta);
    if(data.calificacion) {
      setRating(parseInt(data.calificacion))
    }
    console.log(data);
  }, []);

  const handleContactar = () => {
    if(user.logged) {
      console.log('contactar');
      if (Socket) {
        Socket.emit("mensaje", {
          idVenta: idVenta,
          tipo: 'venta',
          idContacto: idUsuario
        })
        router.push('/chat/');
      }
    } else {
      swal({
        title: "Debe estar logeado para contactar al vendedor",
        text: "¿Deseas hacer login ahora",
        icon: "info",
        buttons: true,
      }).then((acepta) => {
        if (acepta) {
          router.push("/login")
        }
      });
    }
  }

  const handleDenunciar= () => {
    if (user.logged) {
      router.push("/complaint?idVenta:"+idVenta)
    } else {
      swal({
        title: "Debe estar logeado para denunciar",
        text: "¿Deseas hacer login ahora",
        icon: "info",
        buttons: true,
      }).then((acepta) => {
        if (acepta) {
          router.push("/login")
        }
      });
    }
  }

  return (
    <div>
      <div className="row f-flex justify-content-around">
        <Container>
          <Colum1 className="columWidth">
            <GalleryProduct fotos={fotos} />
          </Colum1>

          <Colum2 className="columWidth2">
            <div className="col-12 col-lg-7 mt-7">
              <h1>{producto}</h1>
              <p id="product_id">{producto}</p>
            </div>
            <hr />
            <p id="product_price">L. {precio}</p>
            <hr />
            Estado: <span id="stock_status">{estado}</span>
            <p></p>
            <hr />
            <h4>Descripción:</h4>
            <p>{descripcion}</p>
            <hr />
            <div style={styles.container}>
              <h2> Calificación </h2>

              <div style={styles.stars}>
              <Rating rating={rating} user={user}/>
              </div>
            </div>
            <hr />
            {/* <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
              onClick={() => {
                handleContactar()
              }}
            >
              Contactar Vendedor
            </button> */}
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
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
              onClick={() => {
                handleContactar()
              }}
            >
              <Icon icon="ant-design:phone-twotone" color="#fff" height="25" />{" "}
              Contactar Vendedor
            </button>
            
              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={()=>handleDenunciar()}
              >
                <Icon
                  icon="ant-design:form-outlined"
                  color="#fff"
                  height="25"
                />{" "}
                Denunciar Vendedor
              </button>
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
