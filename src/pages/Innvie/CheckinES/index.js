/* eslint-disable camelcase */
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
import useCheckin from "api/useCheckin"
import useUser from "api/useUser"
import { sendEmailPass } from "api/mail"
import moment from "moment/moment"
import CheckinModal from "./modal"

function Checkin() {
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const { checkinUser, checkoutUser, login, logged, checkedIn } = useUser()
  const { currentEvent, updateEventWithCheckin, updateEventWithCheckout, getCurrentEvent } =
    useCheckin()
  const toggleModal = () => setShow(!show)
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email no válido")
    } else {
      setError(null)
    }

    setMessage(event.target.value)
  }

  const sendEmail = async () => {
    if (Object.keys(currentEvent).length === 0) return
    const access_key = currentEvent.id.substring(0, 6)
    const check_in = moment(currentEvent.startDate).format("MMMM Do YYYY")
    const check_out = moment(currentEvent.endDate).format("MMMM Do YYYY")
    const to_email = currentEvent.email
    sendEmailPass(access_key, to_email, check_in, check_out)
  }
  const handleCheckin = async (e) => {
    e.preventDefault()
    if (checked) {
      toggleModal()
      updateEventWithCheckout()
      checkoutUser()
    } else {
      const formEmail = e.target.email.value
      const formPassword = e.target.password.value
      const confirmed = await login(formEmail, formPassword)
      if (!confirmed) {
        setError("Email o contraseña incorrectos")
        return
      }
      updateEventWithCheckin()
      checkinUser()
      sendEmail()
    }
    setChecked(!checked)
  }
  useEffect(() => {
    if (checked) {
      // const val = Math.floor(1000 + Math.random() * 9000);
      setPassword("Se ha enviado la clave de ingreso a su correo")
    }
  }, [checked])
  useEffect(() => {
    if (checkedIn && logged) {
      setChecked(true)
    }
  }, [checkedIn, logged])
  useEffect(() => {
    getCurrentEvent()
  }, [])

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
          Ingresa tu correo y contraseña para hacer checkin
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3}>
        {Object.keys(currentEvent).length > 0 || checked ? (
          <MKBox component="form" role="form" onSubmit={handleCheckin}>
            {!checked && (
              <>
                {" "}
                <MKBox mb={2}>
                  <MKInput
                    type="email"
                    label="Email"
                    variant="standard"
                    name="email"
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
                    name="password"
                    fullWidth
                    placeholder="************"
                    InputLabelProps={{ shrink: true }}
                  />
                </MKBox>
              </>
            )}
            <MKBox mt={4} mb={1}>
              <MKButton type="submit" variant="gradient" color="error" fullWidth>
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
                    Las intrucciones para ingresar y el código de acceso se enviarán a su correo.
                    Cuando llegue a la habitación, ingrese el código en la cerradura.
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
        ) : (
          <MKBox textAlign="center">
            <MKTypography variant="h1" fontWeight="medium" color="primary" mt={1}>
              No hay reservaciones activas
            </MKTypography>
          </MKBox>
        )}
      </MKBox>
      <CheckinModal show={show} toggleModal={toggleModal} />
    </Card>
  )
}

export default Checkin
