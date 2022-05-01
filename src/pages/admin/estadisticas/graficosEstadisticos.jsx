import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "primereact/button";

//NOS AYUDA A CONECTARNOS CON EL SERVIDOR DEL BACKEND
const linkBack = "http://localhost:4000/api/tienda/estadisticasTotales";

const compEstTotales = () => {
  const [tot, setTot] = useState([]);

  useEffect(() => {
    getTotales();
  }, []);

  //Procedimiento para mostrar
  const getTotales = async () => {
    const response = await axios.get(linkBack, { withCredentials: true });
    setTot(response.data);
  };

  //Vista de usuarios
  return (
    <>
      <div className="row">
        <div className="col">
          <Link
            href="/admin/estadisticas/Semanal"
            className="btn btn-prim mt-2 mb-2"
          >
            <Button label="SEMANALES" className="p-button-success mr-2" />
          </Link>
          <Link
            href="/admin/estadisticas/Mensual"
            className="btn btn-prim mt-2 mb-2"
          >
            <Button label="MENSUALES" className="p-button-success mr-2" />
          </Link>
          <Link
            href="/admin/estadisticas/Anual"
            className="btn btn-prim mt-2 mb-2"
          >
            <Button label="ANUALES" className="p-button-success mr-2" />
          </Link>
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Total de ventas ingresadas</th>
                <th>Categoria con mas ventas</th>
                <th>---</th>
                <th>Categoria mas buscada</th>
                <th>---</th>
                <th>Departamento mas buscado</th>
                <th>---</th>
                <th>FECHA</th>
              </tr>
            </thead>
            <tbody>
              {tot.map((Elemento) => (
                <tr key={Elemento.idET}>
                  <td>{Elemento.ventas_T}</td>
                  <td>{Elemento.nombre_categoria_max_T}</td>
                  <td>{Elemento.categoria_max_T}</td>
                  <td>{Elemento.nombre_categoria_busq_T}</td>
                  <td>{Elemento.categoria_busq_T}</td>
                  <td>{Elemento.nombre_depto_busq_T}</td>
                  <td>{Elemento.depto_busq_T}</td>
                  <td>{Elemento.createdAT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default compEstTotales;
