/*
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useRef, useState } from "react"

// @mui material components
import Grid from "@mui/material/Grid"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography"

// Otis Kit PRO examples
import { Checkbox } from "@mui/material"
import useUser from "api/useUser"
import useCalendar from "api/useCalendar"
import CustomPricingCard from "examples/Cards/PricingCards/CustomPricingCard"
import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"
import { reservedDays, reservedEndDate, reservedStartDate } from "states/reservedDate"
import selectedPrice from "states/selectedPrice"
import { selectedType, maxOccupantsInType } from "states/selectedType"
import taxes from "constants/taxes"
import roundTo from "tools/round"
import { sendEmailConfirmation } from "api/mail"
import { getShortDate } from "tools/getDate"
import MKButton from "components/MKButton"
import useNotifications from "api/useNotifications"
import BlancLayout from "../Layouts/BlancLayout"
import LoginModal from "../Authentication/Login/LoginModal"
import PayButton from "./PayButton"

function Reserve() {
  const [startDate] = useAtom(reservedStartDate)
  const [endDate] = useAtom(reservedEndDate)
  const [days] = useAtom(reservedDays)
  const [type] = useAtom(selectedType)
  const [max] = useAtom(maxOccupantsInType)
  const [price] = useAtom(selectedPrice)
  const navigate = useNavigate()
  const { room, addReservation, getAvailableRoom } = useCalendar({ type, startDate, endDate })
  const [terms, setTerms] = useState(false)
  const { currentUser: user, logged, getAndUpdateUser, checkEmail, mailExists } = useUser()
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

  const handleCheck = () => {
    setTerms(!terms)
  }

  const [party, setParty] = useState(0)
  const [adults, setAdults] = useState(0)
  const [kids, setKids] = useState(0)
  const count = useRef(0)
  useEffect(() => {
    count.current += 1
  })

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

  let countdown
  const onEmailChange = async (e) => {
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
    if (!user) return
    setFormName(user.first_name)
    setFormLastName(user.last_name)
    setFormPhone(user.phone)
    setFormAddress(user.address)
    setFormCity(user.city)
    setFormCountry(user.country)
    setFormZipCode(user.zipcode)
    setFormEmail(user.email)
    setFormLicense(user.license)
  }, [user])

  return (
    <BlancLayout title="Reservación">
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <CustomPricingCard
              badge={{ color: "light", label: "Quotation" }}
              price={{
                currency: "$",
                value: roundTo(days * price + days * price * taxes, 2),
              }}
              specifications={[
                { label: `Room: ${type}`, singlePrice: `$${price}` },
                { label: `${days} day${days > 1 ? "s" : ""}` },
                { label: "Check-in:", singlePrice: startDate },
                { label: "Check-out:", singlePrice: endDate },
                // { label: "Descuento", singlePrice: "50.00", discount: true },
                {
                  label: "Tax",
                  singlePrice: `$${roundTo(taxes * price * days, 2)}`,
                },
              ]}
              action={{
                type: "internal",
                route: "/innvie/confirmation",
                color: "error",
                label: "Pay now",
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <MKBox p={3} bgColor="white" shadow="sm" borderRadius={10}>
              {!logged && <LoginModal />}
              <MKBox component="form" role="form">
                <Grid item xs={12}>
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
                <MKBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox onChange={handleCheck} />
                  <MKTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;I Accept the&nbsp;
                  </MKTypography>
                  <MKTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Terms & Conditions
                  </MKTypography>
                </MKBox>
              </MKBox>
              {!terms || mailExists || !coincidentPassword || !formEmail || party < 1 ? (
                <MKTypography fontWeight="regular" color="error" sx={{ textAlign: "center" }}>
                  Please fill all the fields
                </MKTypography>
              ) : (
                <MKBox mt={3}>
                  <PayButton price={price * days * taxes + price * days} onApprove={onApprove} />
                  <MKButton onClick={onApprove}>on aprobe</MKButton>
                </MKBox>
              )}
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </BlancLayout>
  )
}

export default Reserve
