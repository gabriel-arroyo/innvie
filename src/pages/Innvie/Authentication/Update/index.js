import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// @mui material components
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography"
import Checkbox from "@mui/material/Checkbox"

import { Grid } from "@mui/material"
import useUser from "api/useUser"
import { v4 as uuidv4 } from "uuid"
import ToastAlert from "components/Innvie/ToastAlert"
// import SelectPicker from "components/Innvie/SelectPicker"
import { sendPageNewUser } from "api/mail"
// import useCountries from "api/useCountries"
// import useStates from "api/useStates"
// import useCities from "api/useCities"

function Update() {
  const navigate = useNavigate()
  const { login, currentUser, getCurrentUser } = useUser()
  const [error, setError] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState("United States")
  const [selectedState, setSelectedState] = useState("Alabama")
  const [selectedCity, setSelectedCity] = useState("Birmingham")
  const { getAndUpdateUser, insertError } = useUser()
  const [checked, setChecked] = React.useState(false)
  const [inputName, setInputName] = useState("")
  const [inputLastName, setInputLastName] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputAddress, setInputAddress] = useState("")
  const [inputZipcode, setInputZipcode] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputLicense, setInputLicense] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [inputPasswordConfirmation, setInputPasswordConfirmation] = useState("")
  // const { getCountries } = useCountries()
  // const { getStates } = useStates()
  // const { getCities } = useCities()
  // const [countries, setCountries] = useState([])
  // const [states, setStates] = useState([])
  // const [cities, setCities] = useState([])
  const [inputPreviousPassword, setInputPreviousPassword] = useState("")

  const handleInputName = (event) => {
    const regex = /^[a-zA-Z]*(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    if (!regex.test(event.target.value)) return
    setInputName(event.target.value)
  }

  const handleInputLastName = (event) => {
    const regex = /^[a-zA-Z]*(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    if (!regex.test(event.target.value)) return
    setInputLastName(event.target.value)
  }

  const handleInputPhone = (event) => {
    if (event.target.value.length > 10) return
    const regex = /^(\+?\d{0,10})?$/
    if (!regex.test(event.target.value)) return
    setInputPhone(event.target.value)
  }

  const handleInputAddress = (event) => {
    const regex = /^[a-zA-Z0-9\s,'#-]*$/
    if (!regex.test(event.target.value)) return
    setInputAddress(event.target.value)
  }

  const handleInputZipcode = (event) => {
    if (event.target.value.length > 5) return
    const regex = /^(\d{0,5}(?:[-\s]\d{0,4})?)?$/
    if (!regex.test(event.target.value)) return
    setInputZipcode(event.target.value)
  }

  const handleInputEmail = (event) => {
    // const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    // if (!regex.test(event.target.value)) return
    setInputEmail(event.target.value)
  }

  const handleInputLicense = (event) => {
    const regex = /^(\d{0,13}(?:[-\s]\d{0,4})?)?$/
    if (!regex.test(event.target.value)) return
    setInputLicense(event.target.value)
  }

  const handleInputPreviousPassword = (event) => {
    setInputPreviousPassword(event.target.value)
  }

  const handleInputPassword = (event) => {
    // const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    // if (!regex.test(event.target.value)) return
    setInputPassword(event.target.value)
  }

  const handleInputPasswordConfirmation = (event) => {
    setInputPasswordConfirmation(event.target.value)
  }

  const [showSnackbar, setShow] = useState(false)
  const toggleSnackbar = () => {
    setShow(!showSnackbar)
    setTimeout(() => {
      setShow(false)
    }, 15000)
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

  const handleChange = (event) => {
    setChecked(event.target.checked)
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
    if (checked && inputPreviousPassword !== currentUser.password) {
      setError("Previous password is incorrect")
      isValid = false
    }
    if (!checked && inputPassword !== currentUser.password) {
      setError("Password is incorrect")
      isValid = false
    }

    if (!isValid) {
      return
    }
    if (checked && event.target.password.value !== event.target.password_confirmation.value) {
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
    Promise.resolve(getAndUpdateUser(newUser)).then((res) => {
      if (res) {
        login(event.target.email.value, event.target.password.value).then((logged) => {
          if (logged) {
            event.target.reset()
            sendPageNewUser(inputName + inputLastName, inputEmail, inputPassword)
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
  useEffect(() => {
    // getCountries().then((res) => setCountries(res?.map((country) => country["country-name"]) ?? []))
    const res = getCurrentUser()
    setInputName(res?.first_name ?? "")
    setInputLastName(res?.last_name ?? "")
    setInputPhone(res?.phone ?? "")
    setInputAddress(res?.address ?? "")
    setInputZipcode(res?.zipcode ?? "")
    setInputEmail(res?.email ?? "")
    setInputLicense(res?.license ?? "")
    console.log(res)
  }, [])
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
          My Account
        </MKTypography>
      </MKBox>
      <MKBox p={3}>
        <MKBox component="form" role="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={6}>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="first_name"
                  label="Name"
                  fullWidth
                  required
                  value={inputName}
                  onChange={handleInputName}
                  inputProps={{
                    inputMode: "text",
                    pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="last_name"
                  label="Lastname"
                  fullWidth
                  required
                  value={inputLastName}
                  onChange={handleInputLastName}
                  inputProps={{
                    inputMode: "text",
                    pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  maxLength={10}
                  type="text"
                  name="phone"
                  label="Phone"
                  fullWidth
                  required
                  value={inputPhone}
                  onChange={handleInputPhone}
                  inputProps={{
                    pattern: "^\\d{3}-\\d{3}-\\d{4}$|^[(]\\d{3}[)]\\s\\d{3}-\\d{4}$|^\\d{10}$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="address"
                  label="Address"
                  fullWidth
                  required
                  value={inputAddress}
                  onChange={handleInputAddress}
                  inputProps={{
                    inputMode: "text",
                    pattern: "^[a-zA-Z0-9\\s,'#-]*$",
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                {/* <SelectPicker
                  options={countries}
                  name="country"
                  label="Country"
                  onChange={async (e) => {
                    const country = e.target.innerText
                    const statesFromCountry = await getStates(country)
                    setSelectedCountry(country)
                    setSelectedState("")
                    setSelectedCity("")
                    setStates(statesFromCountry.map((state) => state["state-name"]))
                  }}
                  value={selectedCountry}
                  required
                /> */}
                <MKInput
                  maxLength={40}
                  type="text"
                  name="country"
                  label="Country"
                  fullWidth
                  required
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value)
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                {/* <SelectPicker
                  options={states}
                  name="state"
                  label="State"
                  onChange={async (e) => {
                    const state = e.target.innerText
                    const citiesFromState = await getCities(selectedCountry, state)
                    setSelectedState(state)
                    setSelectedCity("")
                    setCities(citiesFromState?.map((city) => city["city-name"]) ?? [])
                  }}
                  value={selectedState}
                  required
                /> */}
                <MKInput
                  maxLength={40}
                  type="text"
                  name="state"
                  label="State"
                  fullWidth
                  required
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value)
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                {/* <SelectPicker
                  options={cities}
                  name="city"
                  label="City"
                  onChange={(e) => {
                    const city = e.target.innerText
                    setSelectedCity(city)
                  }}
                  value={selectedCity}
                  required
                /> */}
                <MKInput
                  maxLength={40}
                  type="text"
                  name="city"
                  label="City"
                  fullWidth
                  required
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value)
                  }}
                />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="zipcode"
                  label="Zip code"
                  fullWidth
                  required
                  value={inputZipcode}
                  onChange={handleInputZipcode}
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
                  value={inputEmail}
                  onChange={handleInputEmail}
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
                  value={inputLicense}
                  onChange={handleInputLicense}
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
                  Change Password
                </MKTypography>
              </MKBox>
              {!checked && (
                <MKTypography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                  my={1}
                  style={{ fontSize: "0.8rem" }}
                >
                  <i>Enter password to save</i>
                </MKTypography>
              )}
              <MKBox mb={2}>
                {checked && (
                  <MKBox mb={2}>
                    <MKInput
                      type="prevpassword"
                      name="prev_password"
                      label="Previous password"
                      fullWidth
                      required
                      value={inputPreviousPassword}
                      onChange={handleInputPreviousPassword}
                    />
                  </MKBox>
                )}
                {checked && (
                  <MKTypography
                    variant="body2"
                    fontWeight="bold"
                    color="primary"
                    my={1}
                    style={{ fontSize: "0.8rem" }}
                  >
                    <i>
                      At least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special
                      character
                    </i>
                  </MKTypography>
                )}
                <MKInput
                  type="password"
                  name="password"
                  label="Password"
                  fullWidth
                  required
                  value={inputPassword}
                  onChange={handleInputPassword}
                  inputProps={{
                    inputMode: "text",
                    pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                  }}
                />
              </MKBox>
              {checked && (
                <MKBox mb={2}>
                  <MKInput
                    type="password"
                    name="password_confirmation"
                    label="Repeat password"
                    fullWidth
                    required
                    value={inputPasswordConfirmation}
                    onChange={handleInputPasswordConfirmation}
                  />
                </MKBox>
              )}
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
          <MKBox mt={3} mb={1}>
            <MKButton type="submit" variant="gradient" color="error" fullWidth>
              Update
            </MKButton>
          </MKBox>
        </MKBox>
      </MKBox>
      <ToastAlert
        show={showSnackbar}
        toggle={toggleSnackbar}
        color="success"
        title="Success!"
        content="User has been update successfully."
      />
      <ToastAlert
        show={showError}
        toggle={toggleError}
        title="Error"
        content="User could not be updated."
      />
    </Card>
  )
}

export default Update
