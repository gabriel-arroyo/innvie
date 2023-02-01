/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
import PayButton from "pages/Innvie/Reserve/PayButton";
import MKTypography from "components/MKTypography";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Map from "components/Map";
import MKDatePicker from "components/MKDatePicker";
import { useEffect, useState } from "react";
import useType from "api/useType";
import ImageSwipe from "pages/Innvie/Admin/NewRoom/imageswipe";
import roundTo from "tools/round";
import { getDaysDifference, isBefore, parseDate, removeDateRange } from "../../../../tools/getDate";

function Reservation({ user, event }) {
  const { getPhotos, photos } = useType();
  if (!user) {
    return <h1>Loading...</h1>;
  }
  useEffect(() => {
    getPhotos(event.type);
  }, []);

  return (
    <Container>
      <MKTypography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: "20px" }}>
        {event.type}
      </MKTypography>
      <Grid container spacing={2} display="flex" alignItems="center">
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">Nombre:</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">Email:</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">Teléfono:</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">
              {user?.first_name}, {user?.last_name}
            </MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">{user?.email}</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <MKTypography variant="body1">{user.phone}</MKTypography>
          </Container>
        </Grid>
        <Grid item xs={4}>
          {/* <Dates startDate={parseDate(event.startDate)} endDate={parseDate(event.endDate)} /> */}
          <SelectDate
            startDate={parseDate(event.startDate)}
            endDate={parseDate(event.endDate)}
            type={event.type}
          />
        </Grid>
        <Grid item xs={4}>
          <Times />
        </Grid>
        <Grid item xs={4}>
          <Codigo code={event.id.substring(0, 6)} />
        </Grid>
        <Grid item xs={4}>
          <ImageSwipe images={photos} />
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

function SelectDate({ startDate, endDate, type }) {
  const [newStart, setNewStart] = useState(startDate);
  const [newEnd, setNewEnd] = useState(endDate);
  const [days, setDays] = useState();
  const [unpaidStart, setUnpaidStart] = useState();
  const [unpaidEnd, setUnpaidEnd] = useState();
  const [dateDifference, setDateDifference] = useState(false);
  const { getPriceByName, price } = useType();
  console.log("🚀 ~ file: reservation.js:84 ~ SelectDate ~ price", price);
  const [before, setBefore] = useState(false);

  const onChangeDate = (e) => {
    const [estart, eend] = e;
    const start = parseDate(estart);
    const end = parseDate(eend);
    setNewStart(start);
    setNewEnd(end);
    const result = removeDateRange(start, end, startDate, endDate);
    setUnpaidStart(result.startDate);
    setUnpaidEnd(result.endDate);
    setDateDifference(start !== startDate || end !== endDate);
  };
  const onApprove = () => {
    console.log("🚀 ~ file: reservation.js:82 ~ onChangeDate ~ start", newStart);
    console.log("🚀 ~ file: reservation.js:82 ~ onChangeDate ~ end", newEnd);
  };
  useEffect(() => {
    const calcDays = getDaysDifference(newStart, newEnd);
    const b = isBefore(newEnd, endDate);
    setBefore(b);
    setDays(calcDays);
    getPriceByName(type);
  }, [newEnd]);
  return (
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
      <MKTypography variant="body2">{days} Noches</MKTypography>
      <MKTypography variant="h6" color="primary" sx={{ width: "200px", textAlign: "center" }}>
        Fecha inicial / final
      </MKTypography>
      <MKDatePicker
        type="date"
        options={{ mode: "range", defaultDate: [startDate, endDate] }}
        variant="standard"
        placeholder="Please select date"
        fullWidth
        sx={{ width: "20vw", p: "20px" }}
        onChange={onChangeDate}
      />
      {dateDifference && !before && (
        <>
          <MKTypography variant="body3" width={180} textAlign="center" color="error">
            Las siguientes fechas están disponibles:
          </MKTypography>
          <MKTypography variant="body3" width={180} textAlign="center" color="error">
            {unpaidStart} to {unpaidEnd}
          </MKTypography>
          <MKTypography variant="body" color="error" fontWeight="bold" my={2}>
            Cambiar reservación
          </MKTypography>
          <MKTypography>
            Precio total: ${roundTo(price * days + price * days * 4.08, 2)}
          </MKTypography>
          <PayButton price={price * days + price * days * 4.08} onApprove={onApprove} />
        </>
      )}
      {dateDifference && before && (
        <MKTypography variant="body3" textAlign="center" color="error">
          Para solicitar su devolución favor de pasar al mostrador principal
        </MKTypography>
      )}
    </Grid>
  );
}

// function Dates({ startDate, endDate }) {
//   const [days, setDays] = useState();
//   useEffect(() => {
//     const calcDays = getDaysDifference(startDate, endDate);
//     setDays(calcDays);
//   }, []);
//   return (
//     <Container>
//       <MKTypography variant="body1">
//         {startDate} - {endDate}
//       </MKTypography>
//       <MKTypography variant="body2">{days} Noches</MKTypography>
//     </Container>
//   );
// }

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
      <a href="https://goo.gl/maps/HPMADd47LReDdC3p6" target="_blank" rel="noreferrer">
        https://goo.gl/maps/HPMADd47LReDdC3p6
      </a>
    </Container>
  );
}
