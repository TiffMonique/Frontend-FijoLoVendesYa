import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";

//Validacion de campos vacios
const validationSchema = yup.object({
  contenido: yup.string().required("Campo requerido"),
  motivo:yup.string().required("Campo requerido")
});

const theme = createTheme();

export function Complaint(props) {
  const [sucess, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const onSubmit = (values) => {
    const { motivo,contenido } = values;
    console.log(values);

    swal({
      title: "¿Seguro que desea realizar la denuncia?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((acepta) => {
      if (acepta) {
        const response = axios
          .post(
            "http://localhost:4000/api/tienda/creardenuncia",
            {
              contenido: contenido,
              motivo:motivo
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            {
              swal({
                title: "DENUNCIA EXITOSA",
                text: response?.data?.message,
                icon: "success",
                button: "Aceptar",
                timer: "1500",
              });
            }
            formik.resetForm();
          })
          .catch((error) => {
            console.log(error);
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

  //Inicializa los valores del formulario, onsubmit envia la informacion al useFormik y se validan los campos con el validationSchema
  const formik = useFormik({
    initialValues: {motivo:"",contenido: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Realizar Denuncia
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >

          <div className="mb-3">
            <label className="form-label">Motivo de la denuncia</label>
            <br></br>
            <select
              name="motivo"
              className="form-select"
              value={formik.values.motivo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
            <option value="Seleccionar">Seleccione una opción</option>
            <option value="Robo">Robo</option>
            <option value="Pagina Falsa">Página Falsa</option>
            <option value="Ventas no autorizadas">Ventas no autorizadas</option>
            <option value="Fraude o Estafa">Fraude o Estafa</option>
            <option value="Violencia">Violencia</option>
            <option value="Otro">Otro</option>
            </select>
          </div>


          <label className="form-label">Escriba la descripción de la denuncia</label>
            <TextareaAutosize
              maxRows={4}
              aria-label="Maxima altura"
              placeholder="Maximo 4 lineas"
              defaultValue=""
              style={{ width: 400, height: 100 }}
              margin="normal"
              required
              type="textarea"
              name="contenido"
              id="contenido"
              label="contenido"
              value={formik.values.contenido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.contenido && formik.errors.contenido
                ? formik.errors.contenido
                : ""}
            </FieldError>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Complaint;
