import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import swal from "sweetalert";
import { Button } from "primereact/button";

const URI = "http://localhost:4000/api/tienda/todasCategorias";

const CompMostrarCategorias = () => {
  const [categ, setCateg] = useState([]);
  useEffect(() => {
    getCategorias();
  }, []);

  //PROCEDIMIENTO PARA OBTENER LAS CATEGORIAS
  const getCategorias = async () => {
    const response = await axios.get(URI);
    setCateg(response.data);
  };

  //PROCEDIMIENTO PARA ELIMINAR
  const deleteCategorias = async (nombre) => {
    const response = await axios
      .delete(`http://localhost:4000/api/tienda/eliminarCategoria/${nombre}`, {
        withCredentials: true,
      })
      .then((response) => {
        getCategorias();
        swal({
          title: "BORRO EXITOSO",
          text: response?.data?.message,
          icon: "success",
          button: "Aceptar",
          timer: "1500",
        });
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

  //VISTA DE USUARIOS TABLA CON LAS CATEGORIAS
  return (
    <>
      <div className="row">
        <div className="col">
          <Link
            href="/admin/categorias/insertarCategorias"
            className="btn btn-prim mt-2 mb-2"
          >
            <Button
              label="Agregar Categoria"
              icon="pi pi-plus"
              className="p-button-success mr-2"
            />
          </Link>

          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>ACCIONES</th>
                <th>FOTO</th>
              </tr>
            </thead>
            <tbody>
              {categ.map((Categorias) => (
                <tr key={Categorias.nombre}>
                  <td>{Categorias.nombre}</td>
                  <td>{Categorias.descripcion}</td>

                  <td>
                    {/*Link to URL Definida para hacer la peticion en el back*/}
                    <Link
                      href={`/admin/categorias/editarCategoria/${Categorias.nombre}`}
                      className="btn btn-primary"
                    >
                      <Icon
                        icon="akar-icons:edit"
                        color="#f5b921"
                        height="35"
                      />
                    </Link>

                    <Button
                      label="Borrar"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => deleteCategorias(Categorias.nombre)}
                    >
                      <Icon icon="ic:round-delete" color="#f5b921" height="3" />
                    </Button>
                  </td>
                  <td>
                    <img
                      height={150}
                      src={"http://localhost:4000/uploads/" + Categorias.foto}
                    ></img>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CompMostrarCategorias;
