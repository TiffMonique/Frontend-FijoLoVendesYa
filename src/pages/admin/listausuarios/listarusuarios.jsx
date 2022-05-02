import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import swal from "sweetalert";
//NOS AYUDA A CONECTARNOS CON EL SERVIDOR DEL BACKEND
const URI = "http://localhost:4000/api/tienda/todosUsuarios";

const CompMostrarUsuarios = () => {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  //PROCEDIMIENTO PARA OBTENER TODOS LAS VENTAS
  const getUsuarios = async () => {
    const response = await axios.get(URI, { withCredentials: true });
    if (response.data) {
      setUsuarios(response.data);
      console.log(response.data);
    }
  };

  //PROCEDIMIENTO PARA ELIMINAR
  const deleteUsuarios = async (idUsuarios) => {
    await axios.delete(
      `http://localhost:4000/api/tienda/borrarUsuario/${idUsuarios}`,
      {
        withCredentials: true,
      }
    );
    await getUsuarios();
  };

  const confirmDelete = (idUsuarios) => {
    swal({
      title: "¿Está seguro?",
      text: "Los cambios son irreversibles",
      icon: "warning",
      buttons: true,
      warningMode: true,
    }).then((result) => {
      if (result) {
        deleteUsuarios(idUsuarios);
        swal("Borrado Completo!", "Se eliminó el usuario.", "success");
      }
    });
  };

  //console.log(ventas);
  //VISTA DE INTERFAZ DE USUARIO
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>nombre</th>
                <th>apellido</th>
                <th>direccion</th>
                <th>telefono</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.idUsuarios}>
                  <td>{usuario.idUsuarios}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.telefono}</td>
                  <td>
                    <Button
                      label="Eliminar usuario"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => confirmDelete(usuario.idUsuarios)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompMostrarUsuarios;
