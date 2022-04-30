import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import swal from "sweetalert";

//NOS AYUDA A CONECTARNOS CON EL SERVIDOR DEL BACKEND
const URI = "http://localhost:4000/api/tienda/listarVenta";
const URIbackend = "http://localhost:4000/uploads/";
const CompMostrarVentas = () => {
  const router = useRouter();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    getVentas();
  }, []);

  //PROCEDIMIENTO PARA OBTENER TODOS LAS VENTAS
  const getVentas = async () => {
    const response = await axios.get(URI, { withCredentials: true });
    //then((response) => { console.log(response) })
    if (response.data) {
      setVentas(response.data);
    }
  };

  //PROCEDIMIENTO PARA ELIMINAR
  const deleteVentas = async (idVenta) => {
    await axios.delete(
      `http://localhost:4000/api/tienda/eliminarVenta/${idVenta}`,
      {
        withCredentials: true,
      }
    );
    await getVentas();
  };
  const confirmDelete = (idVenta) => {
    swal({
      title: "¿Está seguro?",
      text: "Los cambios son irreversibles",
      icon: "warning",
      buttons: true,
      warningMode: true,
    }).then((result) => {
      if (result) {
        deleteVentas(idVenta);
        swal("Borrado Completo!", "Se eliminó la venta.", "success");
      }
    });
  };

  //console.log(ventas);
  //VISTA DE INTERFAZ DE USUARIO
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link
            href="/admin/ventas/insertarVentas"
            className="btn btn-prim mt-2 mb-2"
          >
            <Button
              label="Agregar Venta"
              icon="pi pi-plus"
              className="p-button-success mr-2"
            />
          </Link>

          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Descripción</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Fecha</th>
                <th>ACCIONES</th>
                <th>Foto</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.idVenta}>
                  <td>{venta.idVenta}</td>
                  <td>{venta.Usuario.nombre}</td>
                  <td>{venta.estado}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.descripcion}</td>
                  <td>{venta.categoria}</td>
                  <td>{venta.precio}</td>
                  <td>{venta.fechaPublicacion}</td>

                  <td>
                    {/*Link to URL Definida para hacer la peticion en el back*/}
                    <Link
                      href={{
                        pathname: `/admin/ventas/editarVentas/${venta.idVenta}`,
                        query: {
                          idUsuario: venta.idUsuario,
                          cantidad: venta.cantidad,
                          categoria: venta.categoria,
                        },
                      }}
                      className="btn btn-primary"
                    >
                      <Icon
                        icon="akar-icons:edit"
                        color="#f5b921"
                        height="35"
                      />
                    </Link>
                    {/* <button
                      name="edit"
                      onClick={() =>
                        router.push({
                          pathname: `editarVentas/${venta.idVenta}`,
                          query: {
                            idUsuario: venta.idUsuario,
                          },
                        })
                      }
                    >
                      editar
                    </button> */}

                    <Button
                      label="Borrar"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => confirmDelete(venta.idVenta)}
                    />
                  </td>
                  <td>
                    <img
                      width="100px"
                      height="100px"
                      src={URIbackend + venta.foto}
                    ></img>
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

export default CompMostrarVentas;
