import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import swal from "sweetalert";

//NOS AYUDA A CONECTARNOS CON EL SERVIDOR DEL BACKEND
const URI = "http://localhost:4000/api/tienda/obtenerdenuncias";

const CompMostrarDenuncias = () => {
  const router = useRouter();
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    getDenuncias();
  }, []);

  //PROCEDIMIENTO PARA OBTENER TODOS LAS DENUNCIAS
  const getDenuncias = async () => {
    const response = await axios.get(URI, { withCredentials: true });
    if (response.data) {
      setDenuncias(response.data);
    }
  };

  //PROCEDIMIENTO PARA ELIMINAR DENUNCIADO
  const deleteDenunciaUsuario = async (denunciado) => {
    swal({
      title: "¿Seguro que desea eliminar el denunciado?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((acepta) => {
      if (acepta) {
        axios
          .delete(
            `http://localhost:4000/api/tienda/borrarUsuario/${denunciado}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            getDenuncias();
            swal({
              title: "DENUNCIDO ELIMINADO",
              text: response?.data?.message,
              icon: "success",
              button: "Aceptar",
              timer: "false",
            });
          })
          .catch((err) => {
            swal({
              title: "HA OCURRIDO UN ERROR",
              text: err.response.data.message,
              icon: "error",
              button: "Aceptar",
              timer: "false",
            });
          });
      }
    });
  };

  //PROCEDIMIENTO PARA ELIMINAR DENUNCIA
  const deleteDenuncia = async (idDenuncia) => {
    swal({
      title: "¿Seguro que desea eliminar la denuncia?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((acepta) => {
      if (acepta) {
        axios
          .delete(
            `http://localhost:4000/api/tienda/eliminardenuncia/${idDenuncia}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            getDenuncias();
            swal({
              title: "DENUNCIA ELIMINADA",
              text: response?.data?.message,
              icon: "success",
              button: "Aceptar",
              timer: "1500",
            });
          })
          .catch((err) => {
            swal({
              title: "HA OCURRIDO UN ERROR",
              text: err.response.data.message,
              icon: "error",
              button: "Aceptar",
              timer: "1500",
            });
          });
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
                <th>Usuario</th>
                <th>Contenido</th>
                <th>denunciado</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {denuncias.map((denuncia) => (
                <tr key={denuncia.idDenuncia}>
                  <td>{denuncia.idDenuncia}</td>
                  <td>{denuncia.idUsuario}</td>
                  <td>{denuncia.contenido}</td>
                  <td>{denuncia.denunciado}</td>
                  <td>
                    {/*Link to URL Definida para hacer la peticion en el back*/}
                    <Button
                      label="Dar de baja"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => {
                        deleteDenunciaUsuario(denuncia.denunciado);
                      }}
                    />
                    <Button
                      label="Borrar Denuncia"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => deleteDenuncia(denuncia.idDenuncia)}
                    ></Button>
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

export default CompMostrarDenuncias;
