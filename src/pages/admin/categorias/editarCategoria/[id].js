import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBar from "../../../../layouts/SideBar";
//NOS CONECTAMOS CON EL SERVIDOR DEL BACKEND
const URI = "http://localhost:4000/api/tienda/editarCategoria/";

const CompActualizarCategoria = () => {
  //OBTENEMOS INFORMACION PARA PODER GESTIONAR LA ACCION
  // const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState("");
  const router = useRouter();
  const { id: nombre } = router.query;

  console.log(router.query);
  const categoriaPorId = async () => {
    const respuesta = await axios
      .get(`http://localhost:4000/api/tienda/unaCategoria/${nombre}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
      });
    //setNombre(respuesta.data.nombre);
    setDescripcion(respuesta.data.descripcion);
  };
  useEffect(() => {
    categoriaPorId();
  }, []);

  //PROCEDIMIENTO PARA ACTUALIZAR
  const modifCateg = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    await axios.put(
      URI + nombre,
      formData,
      {
        withCredentials: true,
      }
    );
    router.push("/admin/categorias");
  };

  //VISTA PARA EL USUARIO
  return (
    <SideBar>
      <h1>EDITAR CATEGORIA</h1>
      <Link href="/categorias" className="btn btn-prim mt-2 mb-2">
        <i className="fa-solid fa-arrow-rotate-left"></i>
      </Link>
      <form onSubmit={modifCateg} id="form">
        <div className="mb-3">
          <label className="form-label" placeholder="Ingrese el nombre">
            Nombre de la categoría
          </label>
          <input
            value={nombre}
            // onChange={(e) => setNombre(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" placeholder="Ingrese su Descripcion">
            Descripción
          </label>
          <input
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foto</label>
          
          <input
            name="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            type="file"
            className="form-control"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          ACTUALIZAR
        </button>
      </form>
    </SideBar>
  );
};

export default CompActualizarCategoria;
