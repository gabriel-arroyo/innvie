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
import React, { useEffect, useState } from "react"
// react-router-dom components
import { useAtom } from "jotai"
import loggedUser from "states/loggedUser"
// @mui material components
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import useUser from "api/useUser"

import { Grid } from "@mui/material"
import useCalendar from "api/useCalendar"
import { useNavigate } from "react-router-dom"
import { reservedEndDate, reservedStartDate } from "states/reservedDate"
import selectedPrice from "states/selectedPrice"
import { selectedType, maxOccupantsInType } from "states/selectedType"
import reservedAdultsAtom from "states/reservedAdults"
import reservedKidsAtom from "states/reservedKids"
import useNotifications from "api/useNotifications"
import { sendEmailConfirmation } from "api/mail"
import { getShortDate } from "tools/getDate"

function ReserveModal() {
  const { login, getCurrentUser, logged, checkEmail, mailExists, getAndUpdateUser } = useUser()
  const [email, setEmail] = useState("")
  console.log(email)
  const [error, setError] = useState(null)

  const [startDate] = useAtom(reservedStartDate)
  const [endDate] = useAtom(reservedEndDate)
  const [type] = useAtom(selectedType)
  const [max] = useAtom(maxOccupantsInType)
  const [price] = useAtom(selectedPrice)
  const [, setReservedAdults] = useAtom(reservedAdultsAtom)
  const [, setReservedKids] = useAtom(reservedKidsAtom)
  const navigate = useNavigate()
  const { room, addReservation, getAvailableRoom } = useCalendar({ type, startDate, endDate })
  const [formName, setFormName] = useState("")
  const [formLastName, setFormLastName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formAddress, setFormAddress] = useState("")
  const [formCity, setFormCity] = useState("")
  const [formCountry, setFormCountry] = useState("")
  const [formZipCode, setFormZipCode] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formLicense, setFormLicense] = useState("")
  const [formPassword, setFormPassword] = useState("")
  const [formConfirPassword, setFormConfirPassword] = useState("")
  const [coincidentPassword, setCoincidentPassword] = useState(true)
  const { addNotification } = useNotifications()
  const [party, setParty] = useState(0)
  const [adults, setAdults] = useState(0)
  const [kids, setKids] = useState(0)

  const [user, setUser] = useAtom(loggedUser)

  const onApprove = async (data, actions) => {
    if (actions) {
      const details = await actions.order.capture()
      console.log(`Transaction ${details.status} by ${details.payer.name.given_name}`)
    }

    const selectedRoom = await getAvailableRoom(type, startDate, endDate)
    console.log("selected room", room?.number ?? "ND")
    const newUser = {
      first_name: formName ?? "",
      last_name: formLastName ?? "",
      phone: formPhone ?? "",
      address: formAddress ?? "",
      city: formCity ?? "",
      country: formCountry ?? "",
      zipcode: formZipCode ?? "",
      email: formEmail ?? "",
      license: formLicense ?? "",
    }
    setReservedAdults(adults)
    setReservedKids(kids)
    await getAndUpdateUser(newUser)
    const code = await addReservation(
      formEmail,
      selectedRoom,
      startDate,
      endDate,
      price,
      adults,
      kids
    )
    if (!code) return
    await sendEmailConfirmation(formName, formEmail, getShortDate(startDate), getShortDate(endDate))
    await addNotification({
      email: formEmail,
      text: `Your reservation has been confirmed. Your reservation code is ${code.substring(0, 6)}`,
    })
    setTimeout(() => {
      navigate(`/confirmation/${code}`)
    }, 1000)
  }

  const handleAdultsChange = (e) => {
    const intAdults = parseInt(e.target.value, 10)
    const intKids = parseInt(kids, 10)
    const newParty = intAdults + intKids
    if (newParty > max) return
    if (intAdults < 1) return
    setParty(newParty)
    setAdults(intAdults)
  }
  const handleKidsChange = (e) => {
    const intKids = parseInt(e.target.value, 10)
    const intAdults = parseInt(adults, 10)
    const newParty = intAdults + intKids
    if (newParty > max) return
    if (intKids < 0) return
    setParty(newParty)
    setKids(intKids)
  }

  const onNameChange = (e) => {
    setFormName(e.target.value)
  }

  const onLastNameChange = (e) => {
    setFormLastName(e.target.value)
  }

  const onPhoneChange = (e) => {
    setFormPhone(e.target.value)
  }

  const onAddressChange = (e) => {
    setFormAddress(e.target.value)
  }

  const onCityChange = (e) => {
    setFormCity(e.target.value)
  }

  const onCountryChange = (e) => {
    setFormCountry(e.target.value)
  }

  const onZipCodeChange = (e) => {
    setFormZipCode(e.target.value)
  }

  function isValidEmail(_email) {
    return /\S+@\S+\.\S+/.test(_email)
  }

  let countdown
  const onEmailChange = async (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Invalid email")
    } else {
      setError(null)
    }

    setEmail(e.target.value)
    setFormEmail(e.target.value)
    clearTimeout(countdown)
    countdown = setTimeout(() => {
      console.log("email changed")
      checkEmail(e.target.value)
    }, 3000)
  }

  const onLiceseChange = (e) => {
    setFormLicense(e.target.value)
  }

  const onPasswordChange = (e) => {
    setFormPassword(e.target.value)
    setCoincidentPassword(formConfirPassword === e.target.value)
  }

  const onConfirmPasswordChange = (e) => {
    setFormConfirPassword(e.target.value)
    setCoincidentPassword(formPassword === e.target.value)
  }

  useEffect(() => {
    if (getCurrentUser()) {
      setUser(getCurrentUser())
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line
    console.log("register created by ", user)
    const success = await login(event.target.email.value, event.target.password.value)
    if (success) {
      // eslint-disable-next-line
      console.log("user logged")
      setError(null)
    } else {
      // eslint-disable-next-line
      console.log("login failed")
      setError("Wrong email or password")
    }
  }

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
          Reserve
        </MKTypography>
        <MKTypography display="block" variant="button" color="white" my={1}>
          Select or create a user for the reservation
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={handleLogin}>
        <MKBox>
          <MKTypography type="h2" sx={{ m: 5, textAlign: "center" }}>
            Reserve
          </MKTypography>
          <Grid item xs={12} lg={4}>
            <MKBox p={3} bgColor="white" shadow="sm" borderRadius={10}>
              <MKBox component="form" role="form">
                <Grid item xs={12}>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      value={formEmail}
                      onChange={onEmailChange}
                      fullWidth
                    />
                  </MKBox>
                  {mailExists && (
                    <MKTypography
                      fontWeight="regular"
                      fontSize={12}
                      color="error"
                      textAlign="center"
                    >
                      This email is already registered. Please login.
                    </MKTypography>
                  )}
                  <MKBox mb={2}>
                    <MKInput
                      onChange={onNameChange}
                      value={formName}
                      type="text"
                      label="Name"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Lastname"
                      value={formLastName}
                      onChange={onLastNameChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Phone"
                      value={formPhone}
                      onChange={onPhoneChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Address"
                      value={formAddress}
                      onChange={onAddressChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="City"
                      value={formCity}
                      onChange={onCityChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Country"
                      value={formCountry}
                      onChange={onCountryChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Zip Code"
                      value={formZipCode}
                      onChange={onZipCodeChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      name="license"
                      label="License Number"
                      value={formLicense}
                      onChange={onLiceseChange}
                      fullWidth
                    />
                  </MKBox>
                </Grid>
                <Grid item xs={12} py={4}>
                  <Grid item>
                    <MKBox mb={2}>
                      <MKInput
                        type="number"
                        name="adults"
                        label="Adults"
                        value={adults}
                        onChange={handleAdultsChange}
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="number"
                        name="children"
                        label="Kids"
                        value={kids}
                        onChange={handleKidsChange}
                      />
                    </MKBox>
                  </Grid>
                </Grid>
                {!logged && (
                  <Grid item xs={12}>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        label="Password"
                        value={formPassword}
                        onChange={onPasswordChange}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        label="Repeat password"
                        value={formConfirPassword}
                        onChange={onConfirmPasswordChange}
                        fullWidth
                      />
                    </MKBox>
                    {!coincidentPassword && (
                      <MKTypography
                        fontWeight="regular"
                        fontSize={12}
                        color="error"
                        textAlign="center"
                      >
                        Passwords do not match
                      </MKTypography>
                    )}
                  </Grid>
                )}
              </MKBox>
              {mailExists || !coincidentPassword || !formEmail || party < 1 ? (
                <MKTypography fontWeight="regular" color="error" sx={{ textAlign: "center" }}>
                  Please fill all the fields
                </MKTypography>
              ) : (
                <MKButton
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={onApprove}
                  fullWidth
                >
                  Reserve
                </MKButton>
              )}
            </MKBox>
          </Grid>
          {error && (
            <MKTypography variant="body2" color="error" textAlign="center">
              {error}
            </MKTypography>
          )}
        </MKBox>
      </MKBox>
    </Card>
  )
}

export default ReserveModal
