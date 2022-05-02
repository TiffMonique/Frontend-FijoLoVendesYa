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
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";

const PASSWORD_REGEX = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const phoneRegExp = /^\d{7,14}$/;

//Yup es la librería para validar los campos de Formik
const validationSchema = yup.object({
  // Un esquema de Yup es un objeto inmutable responsable de validar un objeto en este caso un formulario
  nombre: yup
    .string()
    .min(3, "Ingrese un nombre real")
    .matches(
      /^^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
      "Ingrese un nombre correcto"
    )
    .required("El nombre es requerido"), //min es una funcion de yup que indica que la cantidad minina a ingresar es 3
  apellido: yup
    .string()
    .min(3, "Ingrese un apellido real")
    .matches(
      /^^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
      "Ingrese un apellido correcto"
    )
    .required("El apellido es requerido"),
  correo: yup
    .string()
    .email("Por favor ingrese un correo válido")
    .required("El correo es requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "Numero de Telefóno con 8 digitos :"), //Aqui la funcion matches permite validar si el numero ingresado corresponde a lo indicado en la expresion regular
  direccion: yup
    .string()
    .max(100, "Ingrese una dirección mas corta")
    .min(10, "Ingrese una dirección mas larga"), //La funcio max indica que en el primer paramentro recibido numero maximo de caracteres a ingresar
  pass: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Al menos una mayúscula, una miniscula y un digito"
    )
    .required("La contraseña es requerida"),
  passConfirmation: yup.string().when("pass", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("pass")], "Las contraseñas no coninciden"), //validacion de que la confirmacion de la contraseña sea igual a la contra
  }),
});

export function SignupForm(props) {
  const router = useRouter();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { nombre, apellido, correo, telefono, direccion, pass } = values;
    console.log(values);

    swal({
      title: "Terminos y Condiciones",
      text: `Para completar el registro debes aceptar los términos de uso y el procesamiento, tratamiento y transferencia de datos personales.
        Estoy de acuerdo recibir notificaciones y otra información de parte de la aplicación.`,
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((acepta) => {
      if (acepta) {
        const response = axios
          .post("http://localhost:4000/api/tienda/crear", {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            pass: pass,
            direccion: direccion,
            departamento: departamento,
          })
          .then((response) => {
            {
              swal({
                title: "REGISTRO EXITOSO",
                text: response?.data?.message,
                icon: "success",
                button: "Aceptar",
                timer: "1500",
              });
            }
            formik.resetForm();
            router.push("/login");
          })
          .catch((err) => {
            //  console.log(response);
            //if (err && err.response) setError(err.response.data.message);
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
      } else {
        swal(
          "Para usar esta aplicación debe aceptar los terminos y condiciones",
          { icon: "warning" }
        );
      }
    });
  };

  // formik es una libreria que ayuda a validar campos
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      pass: "",
      passConfirmation: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const theme = createTheme();
  const [departamento, setDepartamento] = useState("");

  return (
    <ThemeProvider theme={theme} onSubmit={formik.handleSubmit}>
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
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="nombre"
              id="nombre"
              label="Nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.pass && formik.errors.pass
                ? formik.errors.pass
                : ""}
            </FieldError>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="apellido"
              id="apellido"
              label="Apellido"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.apellido && formik.errors.apellido
                ? formik.errors.apellido
                : ""}
            </FieldError>
            <TextField
              icon="user"
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo Electronico"
              name="correo"
              autoComplete="email"
              autoFocus
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.correo && formik.errors.correo
                ? formik.errors.correo
                : ""}
            </FieldError>

            <TextField
              margin="normal"
              required
              fullWidth
              id="telefono"
              label="Telefóno, ej: 88888888"
              name="telefono"
              autoFocus
              value={formik.values.telefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.telefono && formik.errors.telefono
                ? formik.errors.telefono
                : ""}
            </FieldError>

            <TextField
              margin="normal"
              required
              fullWidth
              id="direccion"
              label="Dirección"
              name="direccion"
              autoFocus
              value={formik.values.direccion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.direccion && formik.errors.direccion
                ? formik.errors.direccion
                : ""}
            </FieldError>

            <div className="departamentos">
              <label className="form-label"></label>

              <select
                className="form-control"
                value={departamento}
                onChange={(e) => {
                  setDepartamento(e.target.value);
                }}
              >
                <option>Elige un Depto</option>
                <option>Yoro</option>
                <option>El Paraiso</option>
                <option>Fco Morazan</option>
                <option>La paz</option>
                <option>Choluteca</option>
                <option>Valle</option>
                <option>Ocotepeque</option>
                <option>Olancho</option>
                <option>Santa Barbara</option>
                <option>Atlantida</option>
                <option>Cortes</option>
                <option>Lempira</option>
                <option>Is Bahia</option>
                <option>Gracias</option>
                <option>Colon</option>
                <option>Comayagua</option>
                <option>Copan</option>
                <option>Intibuca</option>
              </select>
            </div>

            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              name="pass"
              id="pass"
              label="Contraseña"
              autoComplete="current-password"
              value={formik.values.pass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.pass && formik.errors.pass
                ? formik.errors.pass
                : ""}
            </FieldError>
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              name="passConfirmation"
              label="Contraseña"
              autoComplete="Confirmar Contraseña"
              value={formik.values.passConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError>
              {formik.touched.passConfirmation && formik.errors.passConfirmation
                ? formik.errors.passConfirmation
                : ""}
            </FieldError>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  ¿Ya tienes una cuenta?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Iniciar sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignupForm;
