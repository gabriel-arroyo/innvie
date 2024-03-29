/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
import { getDaysDifference, parseDate } from "tools/getDate"
import MKTypography from "components/MKTypography"
import { Container } from "@mui/material"
import Grid from "@mui/material/Grid"
import GoogleMap from "components/Map"
import { useEffect, useState } from "react"
import useType from "api/useType"
import ImageSwipe from "pages/Innvie/Admin/NewRoom/imageswipe"
import ReserveModal from "./reserveModal"

function Reservation({ user, event }) {
  const { getPhotos, photos, types } = useType()
  if (!user) {
    return <h1>Loading...</h1>
  }
  useEffect(() => {
    getPhotos(event.type)
  }, [])

  return (
    <Container>
      <MKTypography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: "20px" }}>
        {event.type}
      </MKTypography>
      <Grid container spacing={2} display="flex" alignItems="center">
        <Grid item xs={12} lg={4} textAlign="center">
          <UserData data={`${user?.first_name}, ${user?.last_name}`} dataTitle="Nombre:" />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <UserData data={user?.email} dataTitle="Email:" />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <UserData data={user?.phone} dataTitle="Teléfono:" />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <Dates startDate={parseDate(event.startDate)} endDate={parseDate(event.endDate)} />
          <ReserveModal event={event} types={types} />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <Times event={event} />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <Codigo code={event.id.substring(0, 6)} />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <ImageSwipe images={photos} />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <Address />
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <GoogleMap />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Reservation

function Dates({ startDate, endDate }) {
  const [days, setDays] = useState()
  useEffect(() => {
    const calcDays = getDaysDifference(startDate, endDate)
    setDays(calcDays)
  }, [])
  return (
    <Container>
      <MKTypography variant="body2">
        Desde:{" "}
        <span>
          <b>{startDate}</b>
        </span>
      </MKTypography>
      <MKTypography variant="body2">
        Hasta:{" "}
        <span>
          <b>{endDate}</b>
        </span>
      </MKTypography>
      <MKTypography variant="body2">
        {days} Noche{days > 1 ? "s" : ""}
      </MKTypography>
    </Container>
  )
}

function getTime(date, checkuot = false) {
  let checkin = checkuot ? "12:00" : "15:00"
  if (date) {
    // get hours from checkin
    try {
      checkin = `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    } catch {
      try {
        checkin = `${new Date(date).split("T")[1].split(":")[0]}:${
          date.split("T")[1].split(":")[1]
        }`
      } catch {
        checkin = "15:00"
      }
    }
  }
  return checkin
}

function Times({ event }) {
  const checkin = getTime(event.checkin)
  const checkout = getTime(event.checkout, true)
  return (
    <Container>
      <MKTypography variant="body2">Ingreso: {checkin}</MKTypography>
      <MKTypography variant="body2">Salida: {checkout}</MKTypography>
    </Container>
  )
}

function UserData({ data, dataTitle }) {
  return (
    <Container>
      <MKTypography variant="body2">{dataTitle}</MKTypography>
      <MKTypography textAlign="center" variant="body2" fontWeight="normal">
        {data}
      </MKTypography>
    </Container>
  )
}

function Codigo({ code }) {
  return (
    <Container>
      <MKTypography variant="body2">Código de reservación</MKTypography>
      <MKTypography variant="h4" fontWeight="bold">
        {code}
      </MKTypography>
    </Container>
  )
}

function Address() {
  return (
    <Container sx={{ textAlign: "right" }}>
      <MKTypography variant="body2">18732 Dix Toledo HWY Brownstown MI 48193</MKTypography>
      <MKTypography variant="body2">Info para llegar</MKTypography>
      <a href="https://goo.gl/maps/HPMADd47LReDdC3p6" target="_blank" rel="noreferrer">
        https://goo.gl/maps/HPMADd47LReDdC3p6
      </a>
    </Container>
  )
}
