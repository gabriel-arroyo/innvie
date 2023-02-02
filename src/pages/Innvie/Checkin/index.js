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

// react-router-dom components
import { Link } from "react-router-dom"

// @mui material components
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import { useEffect, useState } from "react"

function Checkin() {
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email inválido")
    } else {
      setError(null)
    }

    setMessage(event.target.value)
  }
  const handleCheckin = () => setChecked(!checked)
  useEffect(() => {
    if (checked) {
      // const val = Math.floor(1000 + Math.random() * 9000);
      setPassword("Se ha enviado el código de ingreso a su correo")
    }
  }, [checked])
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
          Checkin
        </MKTypography>
        <MKTypography display="block" variant="button" color="white" my={1}>
          Ingrese su correo y contraseña para hacer checkin
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3}>
        <MKBox component="form" role="form">
          {!checked && (
            <>
              {" "}
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
            <MKButton variant="gradient" color="error" onClick={handleCheckin} fullWidth>
              {!checked ? "Checkin" : "Checkout"}
            </MKButton>
          </MKBox>
          <MKBox mt={3} mb={1} textAlign="center">
            {checked && (
              <>
                <MKTypography variant="h1" fontWeight="medium" color="primary" mt={1}>
                  {password}
                </MKTypography>
                <MKTypography variant="body1" fontWeight="medium" color="primary" mt={1}>
                  Las instrucciones y el código de ingreso será enviado a su correo electrónico. Al
                  llegar digítelo en la cerradura.
                </MKTypography>
              </>
            )}
            {!checked && (
              <MKTypography variant="button" color="text">
                ¿No tienes una cuenta?{" "}
                <MKTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Regístrate
                </MKTypography>
              </MKTypography>
            )}
          </MKBox>
        </MKBox>
      </MKBox>
    </Card>
  )
}

export default Checkin
