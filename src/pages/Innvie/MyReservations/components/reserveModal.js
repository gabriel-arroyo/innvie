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

/* eslint-disable react/prop-types */

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"
import Slide from "@mui/material/Slide"

// @mui icons
import CloseIcon from "@mui/icons-material/Close"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import { parseDate, getDaysDifference, dateIsPast, getShortDate } from "tools/getDate"
import { useState, useReducer, useEffect } from "react"
import taxes from "constants/taxes"
import calculateCost from "tools/calculateCost"
import roundTo from "tools/round"
import useType from "api/useType"
import PayButton from "pages/Innvie/Reserve/PayButton"
import useCalendar from "api/useCalendar"
import { Navigate } from "react-router-dom"
import { sendEmailConfirmation } from "api/mail"
import Comparator from "./comparator"

function newReservationReducer(state, action) {
  const compareReservations = (start, end, type) => {
    const prevStartDate = parseDate(state.prevReservation.startDate)
    const prevEndDate = parseDate(state.prevReservation.endDate)
    const newStartDate = parseDate(start)
    const newEndDate = parseDate(end)
    const sameStartDate = prevStartDate === newStartDate
    const sameEndDate = prevEndDate === newEndDate
    const sameType = state.prevReservation.type === type
    const allEqual = sameStartDate && sameEndDate && sameType
    return allEqual
  }

  switch (action.type) {
    case "update_startDate": {
      if (action.payload === state.newReservation.startDate) return state
      const areEqual = compareReservations(
        action.payload,
        state.newReservation.endDate,
        state.newReservation.type
      )
      const daysDifferente = getDaysDifference(action.payload, state.newReservation.endDate)
      console.log(
        "🚀 ~ file: useNewReservation.jsx:10 ~ newReservationReducer ~ daysDifferente",
        daysDifferente
      )
      return {
        ...state,
        equal: areEqual,
        newReservation: {
          ...state.newReservation,
          startDate: action.payload,
          days: daysDifferente,
          cost: calculateCost(state.newReservation.price, daysDifferente, taxes),
        },
      }
    }
    case "update_endDate": {
      if (action.payload === state.newReservation.endDate) return state
      const start = state.startIsPast
        ? state.prevReservation.startDate
        : state.newReservation.startDate
      const daysDifferente = getDaysDifference(start, action.payload)
      const areEqual = compareReservations(start, action.payload, state.newReservation.type)
      return {
        ...state,
        equal: areEqual,
        newReservation: {
          ...state.newReservation,
          endDate: action.payload,
          days: daysDifferente,
          cost: calculateCost(state.newReservation.price, daysDifferente, taxes),
        },
      }
    }
    case "update_type": {
      const areEqual = compareReservations(
        state.newReservation.startDate,
        state.newReservation.endDate,
        action.payload
      )
      const price = state.types.find((t) => t.type === action.payload)?.price ?? "99999"
      const cost = calculateCost(price, state.newReservation.days, taxes)
      return {
        ...state,
        equal: areEqual,
        newReservation: {
          ...state.newReservation,
          price,
          cost,
          type: action.payload,
        },
      }
    }
    case "get_types":
      return {
        ...state,
        types: action.payload,
      }
    default: {
      return state
    }
  }
}

function ReserveModal({ event }) {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const startIsPast = dateIsPast(event.startDate)
  const endIsPast = dateIsPast(event.endDate)
  const [accept, setAccept] = useState(false)
  const { room, addReservation, getAvailableRoom } = useCalendar({
    type: event.type,
    startDate: event.startDate,
    endDate: event.endDate,
  })

  const days = getDaysDifference(event.startDate, event.endDate)
  const initialState = {
    equal: true,
    startIsPast,
    endIsPast,
    prevReservation: {
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      days,
      price: event.price,
      cost: calculateCost(event.price, days, taxes),
    },
    newReservation: {
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      days,
      price: event.price,
      cost: calculateCost(event.price, days, taxes),
    },
    types: [],
  }
  const [state, dispatch] = useReducer(newReservationReducer, initialState)
  const { getAll } = useType()
  useEffect(() => {
    getAll().then((alltypes) => {
      dispatch({ type: "get_types", payload: alltypes })
    })
  }, [])

  const onChangeDate = (e) => {
    const [estart, eend] = e
    if (eend) {
      const start = parseDate(estart)
      dispatch({ type: "update_startDate", payload: start })
      const end = parseDate(eend)
      dispatch({ type: "update_endDate", payload: end })
    } else {
      const end = parseDate(estart)
      dispatch({ type: "update_endDate", payload: end })
    }
  }
  const handleChangeName = (e) => {
    const selectedType = e.target.innerText
    if (!selectedType) return
    console.log(selectedType)
    dispatch({ type: "update_type", payload: selectedType })
  }

  const handleAccept = () => {
    setAccept(true)
  }

  const onApprove = async (data, actions) => {
    if (actions) {
      const details = await actions.order.capture()
      console.log(`Transaction ${details.status} by ${details.payer.name.given_name}`)
    }

    const selectedRoom = await getAvailableRoom(
      state.newReservation.type,
      state.newReservation.startDate,
      state.newReservation.endDate
    )
    console.log("selected room", room?.number ?? "ND")
    const code = await addReservation(
      event.email,
      selectedRoom,
      event.startDate,
      event.endDate,
      event.price
    )
    if (!code) return
    await sendEmailConfirmation(
      event.first_name,
      event.email,
      getShortDate(event.startDate),
      getShortDate(event.endDate)
    )
    setTimeout(() => {
      Navigate(`/confirmation/${code}`)
    }, 1000)
  }

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
          <MKButton variant="gradient" color="info" onClick={toggleModal}>
            Change reservation
          </MKButton>
          {JSON.stringify()}
        </Grid>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Change reservation</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
                <Container>
                  <Grid
                    container
                    item
                    xs={12}
                    lg={12}
                    flexDirection={{ xs: "column", lg: "row" }}
                    alignItems="center"
                    sx={{ textAlign: "center", my: 0, mx: "auto" }}
                  >
                    <Grid item xs={12} lg={6} flexDirection="column" alignItems="center">
                      {state?.prevReservation && (
                        <Comparator
                          title="My reservation"
                          disabled
                          startIsPast={startIsPast}
                          endIsPast={endIsPast}
                          handleChangeName={handleChangeName}
                          onChangeDate={onChangeDate}
                          reservation={state.prevReservation}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} lg={6} flexDirection="column" alignItems="center">
                      {state?.newReservation && (
                        <Comparator
                          title="New reservation"
                          startIsPast={startIsPast}
                          endIsPast={endIsPast}
                          handleChangeName={handleChangeName}
                          onChangeDate={onChangeDate}
                          reservation={state.newReservation}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Container>
                <MKTypography display="flex" justifyContent="center">
                  Difference payable:
                </MKTypography>
                <MKTypography display="flex" justifyContent="center" variant="h2">
                  ${roundTo(state.newReservation.cost - state.prevReservation.cost, 2)}
                </MKTypography>
                <MKTypography display="flex" justifyContent="center" variant="body2" color="error">
                  {roundTo(state.newReservation.cost - state.prevReservation.cost, 2) >= 0
                    ? ""
                    : "Please go to the reception to get a refund"}
                </MKTypography>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" flexDirection="column" justifyContent="center" p={1.5}>
                <MKBox display="flex" justifyContent="space-between" p={1.5}>
                  <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                    Close
                  </MKButton>
                  <MKButton
                    onClick={handleAccept}
                    variant="gradient"
                    color="error"
                    disabled={state.equal}
                  >
                    Accept changes
                  </MKButton>
                </MKBox>
                {accept && (
                  <MKBox p={2} mx="auto" alginItems="center">
                    <PayButton
                      price={(state.newReservation.cost - state.prevReservation.cost, 2)}
                      onApprove={onApprove}
                    />
                    <MKButton onClick={onApprove}>Approve</MKButton>
                  </MKBox>
                )}
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </Container>
    </MKBox>
  )
}

export default ReserveModal
