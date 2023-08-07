/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import { Divider } from "@mui/material"
import moment from "moment/moment"
import { useState } from "react"
import useNotifications from "api/useNotifications"
import useUser from "api/useUser"
import MKInput from "components/MKInput"
import useCheckin from "api/useCheckin"
import { sendEmailPass } from "api/mail"
import getToken from "api/lockApi"
import MKBox from "../../../components/MKBox/index"
import MKTypography from "../../../components/MKTypography/index"
import MKAlertCloseIcon from "../../../components/MKAlert/MKAlertCloseIcon"
import MKButton from "../../../components/MKButton/index"

const { Modal, Slide } = require("@mui/material")

function CheckinLoginModal({ show, toggleModal, returnHome }) {
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  const { addNotification } = useNotifications()
  const { checkinUser, login } = useUser()
  const { currentEvent, updateEventWithCheckin } = useCheckin()

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
    const check_in = moment(currentEvent.startDate).format("MMMM Do YYYY")
    const check_out = moment(currentEvent.endDate).format("MMMM Do YYYY")
    const to_email = currentEvent.email
    const access_key = await getToken()
    await sendEmailPass(access_key, to_email, check_in, check_out)
    await addNotification({
      email: to_email,
      text: `You have checked in your reservation ${currentEvent.id.substring(0, 6)}`,
    })
  }
  const handleCheckin = async (e) => {
    e.preventDefault()

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
    setChecked(!checked)
  }

  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="500px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          variant="gradient"
          bgColor="white"
          shadow="sm"
          padding="40px"
        >
          <MKBox display="flex" alginItems="center" justifyContent="space-between" py={3} px={2}>
            <MKTypography variant="h6" color="text">
              Please confirm your identity.
            </MKTypography>
            <MKAlertCloseIcon
              color="white"
              fontSize="medium"
              sx={{ cursor: "pointer" }}
              onClick={toggleModal}
            />
          </MKBox>
          <Divider light sx={{ my: 0 }} />

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
            {!checked && (
              <MKBox mt={4} mb={1}>
                <MKButton type="submit" variant="gradient" color="error" fullWidth>
                  Checkin
                </MKButton>
              </MKBox>
            )}
            <MKBox mt={3} mb={1} textAlign="center">
              {checked && (
                <MKTypography variant="body1" fontWeight="medium" color="primary" mt={1}>
                  A login code has been sent to your email.
                  <br />
                  Please enter this code in the lock.
                </MKTypography>
              )}
            </MKBox>
          </MKBox>

          <Divider light sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="center" py={2}>
            {checked ? (
              <MKButton color="white" onClick={returnHome}>
                OK
              </MKButton>
            ) : (
              <MKButton color="white" onClick={toggleModal}>
                Cancel
              </MKButton>
            )}
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  )
}

export default CheckinLoginModal
