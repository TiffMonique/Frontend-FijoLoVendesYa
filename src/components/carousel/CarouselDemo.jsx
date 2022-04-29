import ReactDOM from "react-dom";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { ProductService } from "../../service2/ProductService";

const arrayImage = [
  { imagen: "images/carro.jpg" },
  { imagen: "images/moto2.jpg" },
  { imagen: "images/bolsa.jpg" },
  { imagen: "images/carrito.jpg" },
  { imagen: "images/motos.jpg" },
  { imagen: "images/carroClasic.jpg" },
  { imagen: "images/gatos.jpg" },
  { imagen: "images/futureParents.jpg" },
  { imagen: "images/futureParents.jpg" }
];

const CarouselDemo = () => {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "100px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "180px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productService = new ProductService();

  useEffect(() => {
    productService
      .getProducts()
      .then((data) => setProducts(data.slice(0, 9)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const productTemplate = (data) => {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="mb-3 ">
            <img
              src={`http://localhost:4000/uploads/${data.foto}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.producto}
              className="product-image"
            />
          </div>
          <div>
            <h4 className="mb-1">{data.producto}</h4>
            <h6 className="mt-0 mb-3">L.{data.precio}</h6>

            <span className="product-badge status">{data.estado}</span>
            <div className="car-buttons mt-5">
              <Button
                icon="pi pi-search"
                className="p-button p-button-rounded mr-2"
              />
              <Button
                icon="pi pi-star-fill"
                className="p-button-success p-button-rounded mr-2"
              />
              <Button
                icon="pi pi-cog"
                className="p-button-help p-button-rounded"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="titulo">
        <h1>Recomendaciones para ti</h1>
      </div>
      <div className="carousel-demo">
        <Carousel
          value={products}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
      </div>
      <div className="titulo">
        <h1>Populares</h1>
      </div>
      <div className="grid">
        {arrayImage.map((imagen) => (
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div className="flex justify-content-between mb-3 imagenes">
                <img src={imagen.imagen} />
              </div>
            </div>
          </div>
        ))}
        <div className="titulo">
          <h1>Productos</h1>
        </div>
      </div>
    </>
  );
};

export default CarouselDemo;
