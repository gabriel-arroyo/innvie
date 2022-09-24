import React from "react";
import MKTypography from "components/MKTypography";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";

function Reservation() {
  return (
    <Container>
      <MKTypography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: "20px" }}>
        Habitación Sencilla
      </MKTypography>
      <Grid container spacing={2} display="flex" alignItems="center">
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">John Smith</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">john.smith@mail.com</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1"> 844 0123 456</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Dates />
        </Grid>
        <Grid item xs={4}>
          <Times />
        </Grid>
        <Grid item xs={4}>
          <Codigo />
        </Grid>
        <Grid item xs={4}>
          <MKBox
            component="img"
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
          <MKBox
            component="img"
            src="https://thumbs.dreamstime.com/z/square-map-river-streets-parks-vector-54040512.jpg"
            alt="test"
            borderRadius="lg"
            shadow="md"
            width="100%"
            position="relative"
            zIndex={1}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Reservation;

function Dates() {
  return (
    <Container>
      <MKTypography variant="body1">1/1/2022 - 2/2/2022</MKTypography>
      <MKTypography variant="body2">2 Noches</MKTypography>
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

function Codigo() {
  return (
    <Container>
      <MKTypography variant="body2">Código de reservación</MKTypography>
      <MKTypography variant="h4" fontWeight="bold">
        SA98DF87AS9
      </MKTypography>
    </Container>
  );
}

function Address() {
  return (
    <Container sx={{ textAlign: "right" }}>
      <MKTypography variant="body2">Calle #23, Ciudad, Estado</MKTypography>
      <MKTypography variant="body2">Info para llegar</MKTypography>
      <a href="https://goo.gl/maps/yQH8Jj7wZBYu1fLo7">https://goo.gl/maps/yQH8Jj7wZBYu1fLo7</a>
    </Container>
  );
}
