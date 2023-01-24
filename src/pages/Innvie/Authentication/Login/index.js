/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import loggedUser from "states/loggedUser";
// @mui material components
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import useUser from "api/useUser";

function Login({ modal }) {
  const [logged, setLogged] = useState(false);
  const { login, logout, getCurrentUser } = useUser();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const [user, setUser] = useAtom(loggedUser);

  useEffect(() => {
    if (getCurrentUser()) {
      setLogged(true);
      setUser(getCurrentUser());
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    console.log("login");
    const success = await login(event.target.email.value, event.target.password.value);
    if (success) {
      // eslint-disable-next-line
      console.log("user logged");
      setLogged(true);
      setError(null);
    } else {
      // eslint-disable-next-line
      console.log("login failed");
      setLogged(false);
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = async () => {
    await logout();
    setLogged(false);
    setError(false);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email inválido");
    } else {
      setError(null);
    }

    setMessage(event.target.value);
  };
  return (
    <Card>
      <MKBox
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Ingresar
        </MKTypography>
        <MKTypography display="block" variant="button" color="white" my={1}>
          Ingresa con tu correo y contraseña.
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={handleLogin}>
        <MKBox>
          {logged && (
            <>
              <MKTypography type="h2" sx={{ m: 5, textAlign: "center" }}>
                ¡Bienvenido! {user?.first_name}
              </MKTypography>
              <MKButton
                variant="contained"
                color="error"
                size="large"
                onClick={handleLogout}
                fullWidth
              >
                Cerrar sesión
              </MKButton>
            </>
          )}
          {!logged && (
            <>
              <MKBox mb={2}>
                <MKInput
                  type="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  value={message}
                  onChange={handleChange}
                  fullWidth
                  placeholder="john@example.com"
                  InputLabelProps={{ shrink: true }}
                />
              </MKBox>
              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: "-5px",
                    marginBottom: "5px",
                  }}
                >
                  {error}
                </p>
              )}
              <MKBox mb={2}>
                <MKInput
                  type="password"
                  name="password"
                  label="Contraseña"
                  variant="standard"
                  fullWidth
                  placeholder="************"
                  InputLabelProps={{ shrink: true }}
                />
              </MKBox>
            </>
          )}
          <MKBox mt={4} mb={1}>
            {!logged && (
              <MKButton type="submit" variant="gradient" color="error" fullWidth>
                ingresar
              </MKButton>
            )}
            {logged && !modal && (
              <MKButton component={Link} to="/" variant="gradient" color="error" fullWidth>
                regresar
              </MKButton>
            )}
          </MKBox>
          {!modal && (
            <MKBox mt={3} mb={1} textAlign="center">
              <MKTypography variant="button" color="text">
                ¿No tienes una cuenta?{" "}
                <MKTypography
                  component={Link}
                  to="/authentication/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Regístrate
                </MKTypography>
              </MKTypography>
            </MKBox>
          )}
        </MKBox>
      </MKBox>
    </Card>
  );
}

Login.defaultProps = {
  modal: false,
};

Login.propTypes = {
  modal: PropTypes.bool,
};

export default Login;
