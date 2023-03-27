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
import TermsModal from "pages/Innvie/TermsAndConditions/modal"
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
      setError("Passwords don't match")
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
          Enter your details to create your account
        </MKTypography>
      </MKBox>
      <MKBox p={3}>
        <MKBox component="form" role="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={6}>
              <MKBox mb={2}>
                <MKInput type="text" name="first_name" label="Name" fullWidth required />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="last_name" label="Lastname" fullWidth required />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="phone"
                  label="Phone"
                  fullWidth
                  required
                  inputProps={{
                    pattern: "^\\d{3}-\\d{3}-\\d{4}$|^[(]\\d{3}[)]\\s\\d{3}-\\d{4}$|^\\d{10}$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="address" label="Address" fullWidth required />
              </MKBox>
              <MKBox mb={2}>
                <SelectPicker
                  options={countries}
                  name="country"
                  label="Country"
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
                  label="State"
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
                  label="City"
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
                  label="Zip code"
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
                  label="License Number"
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
                  User already exists
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
                  <i>
                    At least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special
                    character
                  </i>
                </MKTypography>
                <MKInput
                  type="password"
                  name="password"
                  label="Password"
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
                  label="Repit password"
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
              &nbsp;&nbsp;I accept the&nbsp;
            </MKTypography>
            <TermsModal />
          </MKBox>
          <MKBox mt={3} mb={1}>
            <MKButton type="submit" variant="gradient" color="error" fullWidth disabled={!checked}>
              Register
            </MKButton>
          </MKBox>
          <MKBox mt={3} mb={1} textAlign="center">
            <MKTypography variant="button" color="text">
              Already have an account?{" "}
              <MKTypography
                component={Link}
                to="/authentication"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Login
              </MKTypography>
            </MKTypography>
          </MKBox>
        </MKBox>
      </MKBox>
      <ToastAlert
        show={showSnackbar}
        toggle={toggleSnackbar}
        title="Successfull registry"
        content="User has been regitered successfully."
      />
      <ToastAlert
        show={showError}
        toggle={toggleError}
        title="Error"
        content="User could not be registered."
      />
    </Card>
  )
}

export default Register
