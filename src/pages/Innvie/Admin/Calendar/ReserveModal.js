/* eslint-disable react/prop-types */
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
// import { reservedEndDate, reservedStartDate } from "states/reservedDate"
// import selectedPrice from "states/selectedPrice"
// import { selectedType, maxOccupantsInType } from "states/selectedType"
import useNotifications from "api/useNotifications"
import { sendEmailConfirmation } from "api/mail"
import { getShortDate } from "tools/getDate"
import reservedKidsAtom from "states/reservedKids"
import reservedAdultsAtom from "states/reservedAdults"
import MKDatePicker from "components/MKDatePicker"
import useType from "api/useType"
import useRoom from "api/useRoom"

function ReserveModal({ selectedDate, selectedGroup, selectedRoomNumber, tempEndDate }) {
  const {
    login,
    getCurrentUser,
    logged,
    checkEmail,
    mailExists,
    getAndUpdateUser,
    getUserByEmail,
  } = useUser()
  const { getRoomByNumber } = useRoom()
  const { addReservation } = useCalendar({ selectedGroup, selectedDate, tempEndDate })
  const [email, setEmail] = useState("")
  console.log(email)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const { getType } = useType()
  const [maxDate, setMaxDate] = useState(null)
  const [dateSelection, setDateSelection] = useState([selectedDate, selectedDate])
  // const [type] = useAtom(selectedType)
  // const [max] = useAtom(maxOccupantsInType)

  const [, setReservedAdults] = useAtom(reservedAdultsAtom)
  const [, setReservedKids] = useAtom(reservedKidsAtom)
  const navigate = useNavigate()
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
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [roomObject, setRoomObject] = useState(null)

  const [user, setUser] = useAtom(loggedUser)

  const onApprove = async (data, actions) => {
    if (actions) {
      const details = await actions.order.capture()
      console.log(`Transaction ${details.status} by ${details.payer.name.given_name}`)
    }
    console.log("data", data)
    console.log("startDate", startDate)
    console.log("endDate", dateSelection[1])
    // const selectedRoom = await getAvailableRoom(type, startDate, endDate)
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
      roomObject,
      dateSelection[0],
      dateSelection[1],
      selectedRoom.price,
      adults,
      kids
    )
    if (!code) return
    await sendEmailConfirmation(
      formName,
      formEmail,
      getShortDate(dateSelection[0]),
      getShortDate(dateSelection[1])
    )
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
    if (newParty > selectedRoom.maxOccupants) return
    if (intAdults < 1) return
    setParty(newParty)
    setAdults(intAdults)
  }
  const handleKidsChange = (e) => {
    const intKids = parseInt(e.target.value, 10)
    const intAdults = parseInt(adults, 10)
    const newParty = intAdults + intKids
    if (newParty > selectedRoom.maxOccupants) return
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
      getUserByEmail(e.target.value).then((res) => {
        console.log("res", res)
        if (res) {
          setFormName(res.first_name)
          setFormLastName(res.last_name)
          setFormPhone(res.phone)
          setFormAddress(res.address)
          setFormCity(res.city)
          setFormCountry(res.country)
          setFormZipCode(res.zipcode)
          setFormLicense(res.license)
        } else {
          setFormName("")
          setFormLastName("")
          setFormPhone("")
          setFormAddress("")
          setFormCity("")
          setFormCountry("")
          setFormZipCode("")
          setFormLicense("")
        }
      })
    }, 1000)
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
    setStartDate(selectedDate)
    setMaxDate(new Date().setFullYear(new Date().getFullYear() + 1))
    setDateSelection([selectedDate, tempEndDate])
    getType("Single").then((res) => setSelectedRoom(res))
    getRoomByNumber(selectedRoomNumber).then((res) => setRoomObject(res))
    console.log("type---------------", selectedGroup)
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

  const onChangeDate = (date) => {
    console.log("date changed", date)
    setStartDate(date[0].toISOString())
    setDateSelection(date)
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
          Reserve {selectedGroup}
        </MKTypography>
        <MKTypography display="block" variant="button" color="white" my={1}>
          Select or create a user for the reservation
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={handleLogin}>
        <MKBox>
          <Grid item xs={12} lg={4}>
            <MKBox p={3} bgColor="white" shadow="sm" borderRadius={10}>
              <Grid
                item
                sm={10}
                xs={10}
                lg={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <MKTypography variant="h6" color="primary">
                  Start / End date
                </MKTypography>
                <MKDatePicker
                  type="date"
                  startDate={selectedDate}
                  endDate={dateSelection[1]}
                  minDate="today"
                  maxDate={maxDate}
                  variant="standard"
                  placeholder="Please select date"
                  fullWidth
                  sx={{ width: "20vw", p: "20px" }}
                  onChange={onChangeDate}
                />
              </Grid>
              <MKBox component="form" role="form" mt={2}>
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
                      mb={2}
                      mt={-2}
                      fontWeight="regular"
                      fontSize={12}
                      color="error"
                      textAlign="center"
                    >
                      User found
                    </MKTypography>
                  )}
                  {!mailExists && (
                    <MKTypography
                      mb={2}
                      mt={-2}
                      fontWeight="regular"
                      fontSize={12}
                      color="error"
                      textAlign="center"
                    >
                      User NOT found, enter all information to register
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
              {!formEmail ||
              !formAddress ||
              !formCity ||
              !formCountry ||
              !formName ||
              !formLastName ||
              !formPhone ||
              !formZipCode ||
              !formLicense ||
              party < 1 ? (
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
