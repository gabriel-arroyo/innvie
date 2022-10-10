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
import React, { useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

function Login() {
  const [logged, setLogged] = useState(false);
  const handleLogin = () => {
    setLogged(!logged);
  };
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
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
      <MKBox pt={4} pb={3} px={3}>
        <MKBox component="form" role="form">
          {logged && <MKTypography type="h2">¡Bienvenido!</MKTypography>}
          {!logged && (
            <>
              <MKBox mb={2}>
                <MKInput
                  type="email"
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
              <MKButton variant="gradient" color="error" onClick={handleLogin} fullWidth>
                ingresar
              </MKButton>
            )}
            {logged && (
              <MKButton component={Link} to="/" variant="gradient" color="error" fullWidth>
                regresar
              </MKButton>
            )}
          </MKBox>
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
        </MKBox>
      </MKBox>
    </Card>
  );
}

export default Login;
