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
import { useNavigate } from "react-router-dom"

// @mui material components
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import { useEffect, useState } from "react"
import useCheckin from "api/useCheckin"
import useUser from "api/useUser"
import { sendEmailPass } from "api/mail"
import useNotifications from "api/useNotifications"
import moment from "moment/moment"
import CheckinModal from "./modal"
import CheckinTable from "./table"

function Checkin() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const { addNotification } = useNotifications()
  const { checkinUser, checkoutUser, login, logged, checkedIn } = useUser()
  const {
    currentEvent,
    allCurrentEvents,
    updateEventWithCheckin,
    updateEventWithCheckout,
    getCurrentEvent,
  } = useCheckin()
  const toggleModal = () => {
    navigate("authentication/checkin")
    setShow(!show)
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Invalid email")
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
    await sendEmailPass(access_key, to_email, check_in, check_out)
    await addNotification({
      email: to_email,
      text: `You have checked in your reservation ${currentEvent.id.substring(0, 6)}`,
    })
  }
  const handleCheckin = async (e) => {
    e.preventDefault()
    if (checked) {
      toggleModal()
      updateEventWithCheckout()
      checkoutUser()
      await addNotification({
        email: currentEvent.email,
        text: `You have checked out your reservation ${currentEvent.id.substring(0, 6)}`,
      })
    } else {
      const formEmail = e.target.email.value
      const formPassword = e.target.password.value
      const confirmed = await login(formEmail, formPassword)
      if (!confirmed) {
        setError("Wrong email or password")
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
          Enter your email and password to checkin
        </MKTypography>
      </MKBox>
      <CheckinTable rows={allCurrentEvents} />
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
                    label="Password"
                    variant="standard"
                    name="password"
                    fullWidth
                    placeholder="************"
                    InputLabelProps={{ shrink: true }}
                  />
                </MKBox>
              </>
            )}
          </MKBox>
        ) : (
          <MKBox textAlign="center">
            <MKTypography variant="h1" fontWeight="medium" color="primary" mt={1}>
              No active reservations
            </MKTypography>
          </MKBox>
        )}
      </MKBox>
      <CheckinModal show={show} toggleModal={toggleModal} />
    </Card>
  )
}

export default Checkin
