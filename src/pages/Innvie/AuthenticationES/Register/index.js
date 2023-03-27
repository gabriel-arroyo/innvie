import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// @mui material components
import Card from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography"

import { Grid } from "@mui/material"
import useUser from "api/useUser"
import TermsModal from "pages/Innvie/TermsAndConditionsES/modal"
import { v4 as uuidv4 } from "uuid"
import ToastAlert from "components/Innvie/ToastAlert"
import SelectPicker from "components/Innvie/SelectPicker"
import options from "./countries.json"

function Register() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [error, setError] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState("United States")
  const [selectedState, setSelectedState] = useState("Alabama")
  const [selectedCity, setSelectedCity] = useState("Birmingham")
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const { addUser, insertError } = useUser()
  const [checked, setChecked] = React.useState(false)
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  const countries = options.Countries.map((countrry) => countrry.CountryName)

  const getCountry = (country) => options.Countries.find((c) => c.CountryName === country)
  const getStates = (country) => {
    const countryInfo = getCountry(country)
    const foundStates = countryInfo?.States
      ? countryInfo.States.map((state) => state.StateName)
      : []
    setStates(foundStates)
    setCities([])
    return foundStates
  }
  const getCities = (country, state) => {
    console.log("getCities", country, state)
    const countryInfo = getCountry(country)
    const foundCities = countryInfo?.States.find((s) => s.StateName === state)?.Cities ?? []
    setCities(foundCities)
    return foundCities
  }

  const [showSnackbar, setShow] = useState(false)
  const toggleSnackbar = () => {
    setShow(!showSnackbar)
    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  const [showError, setShowError] = useState(false)
  const toggleError = () => {
    setShowError(!showSnackbar)
    setTimeout(() => {
      setShowError(false)
    }, 3000)
  }

  const navigateDelay = () => {
    setTimeout(() => {
      navigate("/")
    }, 3000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Check if all required fields are filled
    const inputs = event.target.querySelectorAll("input[required]")
    let isValid = true
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        setError(`${input.name} is required`)
        isValid = false
      }
    })

    if (!isValid) {
      return
    }
    if (event.target.password.value !== event.target.password_confirmation.value) {
      setError("Las contraseñas no coinciden")
      return
    }
    const newUser = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
      city: event.target.city.value,
      state: event.target.state.value,
      country: event.target.country.value,
      zipcode: event.target.zipcode.value,
      email: event.target.email.value.toString().toLowerCase(),
      password: event.target.password.value,
      id: uuidv4(),
      license: event.target.license.value,
    }
    Promise.resolve(addUser(newUser)).then((res) => {
      if (res) {
        login(event.target.email.value, event.target.password.value).then((logged) => {
          if (logged) {
            event.target.reset()
            toggleSnackbar()
            setChecked(false)
            navigateDelay()
          }
        })
      } else {
        toggleError()
      }
    })
  }
  return (
    <Card sx={{ width: { sm: "300px", lg: "700px", xs: "250px" } }}>
      <MKBox
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="primary"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Registro
        </MKTypography>
        <MKTypography display="block" variant="button" color="white" my={1}>
          Ingresa tus datos para registrarte
        </MKTypography>
      </MKBox>
      <MKBox p={3}>
        <MKBox component="form" role="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={6}>
              <MKBox mb={2}>
                <MKInput type="text" name="first_name" label="Nombre" fullWidth required />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="last_name" label="Apellido" fullWidth required />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="phone"
                  label="Teléfono"
                  fullWidth
                  required
                  inputProps={{
                    pattern: "^\\d{3}-\\d{3}-\\d{4}$|^[(]\\d{3}[)]\\s\\d{3}-\\d{4}$|^\\d{10}$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="address" label="Dirección" fullWidth required />
              </MKBox>
              <MKBox mb={2}>
                <SelectPicker
                  options={countries}
                  name="country"
                  label="País"
                  onChange={(e) => {
                    const country = e.target.innerText
                    const statesFromCountry = getStates(country)
                    setSelectedCountry(country)
                    setSelectedState("")
                    setSelectedCity("")
                    setStates(statesFromCountry)
                  }}
                  value={selectedCountry}
                  required
                />
              </MKBox>
              <MKBox mb={2}>
                <SelectPicker
                  options={states}
                  name="state"
                  label="Estado"
                  onChange={(e) => {
                    const state = e.target.innerText
                    const citiesFromState = getCities(selectedCountry, state)
                    setSelectedState(state)
                    setSelectedCity("")
                    setCities(citiesFromState)
                  }}
                  value={selectedState}
                  required
                />
              </MKBox>
              <MKBox mb={2}>
                <SelectPicker
                  options={cities}
                  name="city"
                  label="Ciudad"
                  onChange={(e) => {
                    const city = e.target.innerText
                    setSelectedCity(city)
                  }}
                  value={selectedCity}
                  required
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="zipcode"
                  label="Código Postal"
                  fullWidth
                  required
                  inputProps={{ inputMode: "numeric", pattern: "^\\d{5}(?:[-\\s]\\d{4})?$" }}
                />
              </MKBox>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <MKBox mb={2}>
                <MKInput
                  type="email"
                  name="email"
                  label="Email"
                  fullWidth
                  required
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="license"
                  label="Licencia"
                  fullWidth
                  required
                  inputProps={{ inputMode: "numeric", pattern: "^(\\d{4,13})$" }}
                />
              </MKBox>
              {insertError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: "-5px",
                    marginBottom: "5px",
                  }}
                >
                  El usuario ya existe
                </p>
              )}
              <MKBox mb={2}>
                <MKTypography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                  mt={1}
                  style={{ fontSize: "0.8rem" }}
                >
                  <i>Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter</i>
                </MKTypography>
                <MKInput
                  type="password"
                  name="password"
                  label="Contraseña"
                  fullWidth
                  required
                  inputProps={{
                    inputMode: "text",
                    pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="password"
                  name="password_confirmation"
                  label="Repite Contraseña"
                  fullWidth
                  required
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
            </Grid>
          </Grid>
          <MKBox
            display="flex"
            alignItems="center"
            ml={-1}
            flexDirection={{ lg: "row", xs: "column" }}
          >
            <Checkbox checked={checked} onChange={handleChange} />
            <MKTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Acepto los&nbsp;
            </MKTypography>
            <TermsModal />
          </MKBox>
          <MKBox mt={3} mb={1}>
            <MKButton type="submit" variant="gradient" color="error" fullWidth disabled={!checked}>
              Registrarse
            </MKButton>
          </MKBox>
          <MKBox mt={3} mb={1} textAlign="center">
            <MKTypography variant="button" color="text">
              ¿Ya tienes una cuenta?{" "}
              <MKTypography
                component={Link}
                to="/authentication"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Ingresa
              </MKTypography>
            </MKTypography>
          </MKBox>
        </MKBox>
      </MKBox>
      <ToastAlert
        show={showSnackbar}
        toggle={toggleSnackbar}
        title="Registro exitoso"
        content="El usuario se ha registrado con éxito."
      />
      <ToastAlert
        show={showError}
        toggle={toggleError}
        title="Error"
        content="No se ha podido registrar el usuario."
      />
    </Card>
  )
}

export default Register
