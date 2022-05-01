import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import SideBar from "../../../components/admin/SideBar";

const compSemanales = () => {
  const linkBack = "http://localhost:4000/api/tienda/estadisticasSemanales";
  const [sem, setSem] = useState([]);

  useEffect(() => {
    getSemanales();
  }, []);

  //Procedimiento para mostrar
  const getSemanales = async () => {
    const response = await axios.get(linkBack, { withCredentials: true });
    setSem(response.data);
  };

  //Vista de usuarios
  return (
    <SideBar>
      <>
        <div className="row">
          <div className="col">
            <Link href="/admin/estadisticas" className="btn btn-prim mt-2 mb-2">
              <Button label="TOTALES" className="p-button-success mr-2" />
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
                {sem.map((Elemento) => (
                  <tr key={Elemento.idES}>
                    <td>{Elemento.ventas_S}</td>
                    <td>{Elemento.nombre_categoria_max_S}</td>
                    <td>{Elemento.categoria_max_S}</td>
                    <td>{Elemento.nombre_categoria_busq_S}</td>
                    <td>{Elemento.categoria_busq_S}</td>
                    <td>{Elemento.nombre_depto_busq_S}</td>
                    <td>{Elemento.depto_busq_S}</td>
                    <td>{Elemento.createdAT}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </SideBar>
  );
};

export default compSemanales;
