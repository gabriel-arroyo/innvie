/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MKTypography from "components/MKTypography";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import useUser from "api/useUser";
import MKBox from "components/MKBox";
import Map from "components/Map";
import image from "../../../../assets/images/photos/IMG_2.JPG";
import { getDaysDifference } from "../../../../tools/getDate";

function Reservation({ type, email, code, startDate, endDate }) {
  const { data, getUserByEmail } = useUser();

  useEffect(() => {
    getUserByEmail(email);
  }, []);

  return (
    <Container>
      <MKTypography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: "20px" }}>
        {type}
      </MKTypography>
      <Grid container spacing={2} display="flex" alignItems="center">
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">
              {data.first_name}, {data.last_name}
            </MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">{email}</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">{data.phone}</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Dates startDate={startDate} endDate={endDate} />
        </Grid>
        <Grid item xs={4}>
          <Times />
        </Grid>
        <Grid item xs={4}>
          <Codigo code={code} />
        </Grid>
        <Grid item xs={4}>
          <MKBox
            component="img"
            src={image}
            alt="test"
            borderRadius="lg"
            shadow="md"
            width="100%"
            position="relative"
            zIndex={1}
          />
        </Grid>
        <Grid item xs={4}>
          <Address />
        </Grid>
        <Grid item xs={4}>
          <Map />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Reservation;

function Dates({ startDate, endDate }) {
  const [days, setDays] = useState();
  useEffect(() => {
    const calcDays = getDaysDifference(startDate, endDate);
    setDays(calcDays);
  }, []);
  return (
    <Container>
      <MKTypography variant="body1">
        {startDate} - {endDate}
      </MKTypography>
      <MKTypography variant="body2">{days} Noches</MKTypography>
    </Container>
  );
}

function Times() {
  return (
    <Container>
      <MKTypography variant="body2">Ingreso: 13:00</MKTypography>
      <MKTypography variant="body2">Salida: 12:00</MKTypography>
    </Container>
  );
}

function Codigo({ code }) {
  return (
    <Container>
      <MKTypography variant="body2">Código de reservación</MKTypography>
      <MKTypography variant="h4" fontWeight="bold">
        {code}
      </MKTypography>
    </Container>
  );
}

function Address() {
  return (
    <Container sx={{ textAlign: "right" }}>
      <MKTypography variant="body2">18732 Dix Toledo HWY Brownstown MI 48193</MKTypography>
      <MKTypography variant="body2">Info para llegar</MKTypography>
      <a href="https://goo.gl/maps/yQH8Jj7wZBYu1fLo7">https://goo.gl/maps/yQH8Jj7wZBYu1fLo7</a>
    </Container>
  );
}
