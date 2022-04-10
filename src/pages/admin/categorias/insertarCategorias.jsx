import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
} from "../../../components/accountBox/common";
import { Icon } from "@iconify/react";
import SideBar from "../../../components/admin/SideBar";

//NOS CONECTAMOS CON EL SERVIDOR DEL BACKEND
const URI = "http://localhost:4000/api/tienda/crearCategoria";

const CompRegistrarCategorias = () => {
  //OBTENEMOS LA INFORMACION PARA GESTIONAR LA ACCION
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);

  //PROCEDIMIENTO PARA GUARDAR
  const router = useRouter();
  const guardarCateg = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    await axios.post(
      URI,
      formData,
      { withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    router.push("/admin/categorias");
  };

  return (
    <SideBar>
      <BoxContainer>
        <h1>NUEVA CATEGORIA</h1>
        <Link href="/admin/categorias" className="btn btn-prim mt-2 mb-2">
          <Icon icon="fa:rotate-left" color="#0c97aa" />
        </Link>
        <FormContainer onSubmit={guardarCateg} id='form'>
          <FieldContainer>
            <div className="mb-3">
              <label className="form-label" placeholder="Ingrese su nombre">
                Nombre de la categoría
              </label>
              <input
                value={nombre}
                name="nombre"
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </FieldContainer>

          <div className="mb-3">
            <label
              className="form-label"
              placeholder="Ingrese su correo Electrónico"
            >
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
            GUARDAR
          </button>
        </FormContainer>
      </BoxContainer>
    </SideBar>
  );
};

export default CompRegistrarCategorias;
