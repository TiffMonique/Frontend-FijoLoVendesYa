import axios from "axios";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import SideBar from "../../../components/admin/SideBar";
const URI = "http://localhost:4000/api/tienda/crearVenta/";

const CompRegistrarVentas = () => {
  useEffect(() => {
    listacategorias();
  }, []);

  const listacategorias = async (e) => {
    const response = await fetch(
      "http://localhost:4000/api/tienda/todasCategorias/"
    );
    const data = await response.json();
    setCategorias(data);
    setCategoria(data[0].nombre);
  };
  const [idUsuario, setIdUsuario] = useState("");
  const [estado, setEstado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [fotos, setFotos] = useState([]);

  const router = useRouter();

  const devolverEstado = (event) => {
    console.log("cambioEstado");
    console.log(event.target.value);
    return setEstado(event.target.value);
  };

  //Procedimiento guardar
  const store = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);

    await axios
      .post(
        URI,
        // {
        //   //idVenta: idVenta,
        //   //idUsuario: idUsuario,
        //   estado: estado,
        //   producto: producto,
        //   cantidad: cantidad,
        //   descripcion: descripcion,
        //   categoria: categoria,
        //   precio: precio,
        //   foto: fotos,
        // },
        formData,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    router.push("/admin/ventas");
  };

  return (
    <SideBar>
      <h1 className="venta">CREAR VENTA</h1>

      <form className="formV" onSubmit={store} id="form">
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <br></br>
          <select
            name="estado"
            className="form-select"
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Disponible">Disponible</option>
            <option value="No Disponible">No Disponible</option>
          </select>
          {estado}
        </div>

        <div className="mb-3">
          <label className="form-label">Producto</label>
          <input
            name="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            name="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripcion</label>
          <input
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
            name="categoria"
            className="form-control"
            multiple={false}
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            {categorias.map((elemento) => (
              <option key={elemento.nombre} value={elemento.nombre}>
                {elemento.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            name="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            name="fechaPublicacion"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
            type="date"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Foto</label>
          <input
            name="foto"
            value={fotos}
            onChange={(e) => setFotos(e.target.value)}
            type="file"
            multiple
            className="form-control"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </SideBar>
  );
};

export default CompRegistrarVentas;
