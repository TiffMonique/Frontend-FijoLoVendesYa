import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideBar from "../../../../layouts/SideBar";
import swal from "sweetalert";

const URI = "http://localhost:4000/api/tienda/editarVenta/";

const CompEditarVentas = () => {
  useEffect(() => {
    listacategorias();
  }, []);

  const listacategorias = async (e) => {
    const response = await fetch(
      "http://localhost:4000/api/tienda/todasCategorias/"
    );
    const data = await response.json();
    setCategorias(data);
  };
  const [idUsuario, setIdUsuario] = useState("");
  const [estado, setEstado] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState(0);
  const [fechaPublicacion, setFechaPublicacion] = useState("");

  const router = useRouter();
  const {
    id: idVenta,
    idUsuario: usuario,
    cantidad: cantidadVenta,
    categoria: categoriaVenta,
  } = router.query;

  //const { idVenta } = useParams()

  console.log(router.query);
  //Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    const response = await axios
      .put(
        URI + idVenta,
        {
          idUsuario: idUsuario,
          estado: estado,
          cantidad: cantidad,
          producto: producto,
          descripcion: descripcion,
          categoria: categoria,
          precio: precio,
          fechaPublicacion: fechaPublicacion,
        },
        { withCredentials: true }
      )
      .then((response) => {
        {
          swal({
            title: "EDICION EXITOSA",
            text: response?.data?.message,
            icon: "success",
            button: "Aceptar",
            timer: "1500",
          });
        }
        router.push("/admin/ventas");
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "HA OCURRIDO UN ERROR",
          text: err.response.data.message,
          icon: "error",
          button: "Aceptar",
          timer: "1500",
        });
      });

    if (response && response.data) {
      console.log("Hola");
      setError(null);
      setSuccess(response?.data?.message);
    }
  };

  useEffect(() => {
    setCantidad(Number(cantidadVenta));
    setCategoria(categoriaVenta);
  }, [cantidadVenta, categoriaVenta]);

  useEffect(() => {
    getVentaById();
  }, []);

  const getVentaById = async () => {
    const response = await axios.get(
      `http://localhost:4000/api/tienda/buscarVenta/${idVenta}`,
      { withCredentials: true }
    );
    setEstado(response.data.estado);
    setCantidad(response.data.cantidad);
    setProducto(response.data.producto);
    setDescripcion(response.data.descripcion);
    setCategoria(response.data.categoria);
    setPrecio(response.data.precio);
    setFechaPublicacion(response.data.fechaPublicacion);
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  return (
    <SideBar>
      <h1 className="tituloI">EDITAR VENTA</h1>

      <form className="ventasinsert" onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">idUsuario</label>
          <input
            value={usuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
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
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripcion</label>
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
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
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
            type="date"
            className="form-control"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Editar
        </button>
      </form>
    </SideBar>
  );
};

export default CompEditarVentas;
