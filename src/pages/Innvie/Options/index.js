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

import useMediaQuery from "@mui/material/useMediaQuery"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
// import Card from "@mui/material/Card";
import MKAlert from "components/MKAlert"
// @mui material components
import Icon from "@mui/material/Icon"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import DateInput from "pages/Innvie/Home/components/Date/DateInput"
// Otis Kit PRO examples

// Images
import { useAtom } from "jotai"
import { reservedEndDate, reservedStartDate } from "states/reservedDate"
import bgImage from "../../../assets/images/photos/innvie1.png"

import OffersSwipe from "../Home/sections/OffersSwipe"
import Places from "./sections/Places"
// import Amenities from "../Home/sections/Amenities";

function Options() {
  const [startDate] = useAtom(reservedStartDate)
  const [endDate] = useAtom(reservedEndDate)

  const matches = useMediaQuery("(min-width:1000px)")
  return (
    <>
      <MKBox
        minHeight="50vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={6}
            justifyContent="center"
            sx={{ mx: "auto", textAlign: "center", marginTop: matches ? "0px" : "150px" }}
          >
            <MKTypography
              variant="h2"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Nuestras Opciones
            </MKTypography>
            <MKTypography variant="body1" color="white" mt={1}>
              Habitaciones disponibles para la fecha seleccionada:
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
            backgroundColor: "white",
            padding: "10px",
            width: matches ? "500px" : "300px",
            borderRadius: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <DateInput startDate={startDate} endDate={endDate} />
        </div>

        {!startDate && (
          <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MKAlert color="error" dismissible sx={{ width: "540px" }}>
              <Icon fontSize="small">warning</Icon>&nbsp; Favor de seleccionar una fecha para
              validar la disponibilidad
            </MKAlert>
          </Container>
        )}
        <Places />
        <Container>
          <br />
          <br />
        </Container>
        <OffersSwipe
          cards={[
            {
              variant: "gradient",
              color: "primary",
              icon: "local_offer",
              title: "7x6",
              description: "Paga 6 noches y la séptima es gratis. ",
              description2: "Válido solamente al pagar 6 noches por adelantado.",
              description3: "Ahorra 90 USD o más.",
            },
            {
              variant: "gradient",
              color: "primary",
              icon: "local_offer",
              title: "3 Noches gratis",
              description: "Paga 2 semanas y obtén 3 noches gratis.",
              description2: "Válido solamente al pagar 2 semanas por adelantado.",
              description3: "Ahorra 195 USD",
            },
          ]}
        />
        {/* <Amenities /> */}
      </Container>
      {/* </Card> */}
    </>
  )
}

export default Options
