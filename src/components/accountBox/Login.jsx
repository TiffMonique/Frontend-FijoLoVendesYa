import React, { useContext, useState, createContext } from "react";
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
import UserContext from "../../context/UserContext";
import UseUser from "../../hooks/UseUser";
import UseSocket from "../../hooks/UseSocket";
//Validacion de campos vacios
const validationSchema = yup.object({
  correo: yup.string().required("Campo requerido"),
  pass: yup.string().required("Campo requerido"),
});

const theme = createTheme();

// export default function Singinup() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

export function Singinup(props) {
  const [setSuccess] = useState(null);
  const [setError] = useState(null);
  const router = useRouter();
  const user = UseUser();
  const socket = UseSocket();
  
  //controlador del formulario se activa cuando se envia el formulario
  const onSubmit = async (values) => {
    const { correo, pass } = values;
    console.log(values);
    
    const response = await axios
      .post(
        "http://localhost:4000/api/tienda/login",
        {
          correo: correo,
          pass: pass,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const admin = response.data.admin;console.log(user);
        user.cambiarContexto(true, admin);
        //socket.conectar();
        console.log('Despues de conectar');
        swal({
          title: "LOGIN EXITOSO",
          text: response?.data?.message,
          icon: "success",
          button: "Aceptar",
          timer: "1500",
        });
        formik.resetForm();

        if (response?.data?.admin === true) {
          router.push("/admin/categorias");
        } else {
          router.push("/HomeUser");
        }
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

  //Inicializa los valores del formulario, onsubmit envia la informacion al useFormik y se validan los campos con el validationSchema
  const formik = useFormik({
    initialValues: { correo: "", pass: "" },
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recoverPassword" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2">
                  {"¿No tienes una cuenta?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Singinup;
