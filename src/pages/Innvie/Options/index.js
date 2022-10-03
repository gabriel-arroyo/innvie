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

import { useParams } from "react-router-dom";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import MKAlert from "components/MKAlert";
// @mui material components
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DateInput from "pages/Innvie/Home/components/Date/DateInput";
// Otis Kit PRO examples

// Rental page sections
// import Search from "pages/LandingPages/Rental/sections/Search";
import Places from "pages/LandingPages/Rental/sections/Places";
// import Testimonials from "pages/LandingPages/Rental/sections/Testimonials";
// import Faq from "pages/LandingPages/Rental/sections/Faq";
// import Contact from "pages/LandingPages/Rental/sections/Contact";

// Images
import bgImage from "../../../assets/images/photos/IMG_0535.JPG";

import Offers from "../Home/components/Offers/offers";
import Places2 from "../Home/sections/Amenities";

function Options() {
  const showAlert = false;
  const { startDate, endDate } = useParams();
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
            sx={{ mx: "auto", textAlign: "center" }}
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
      {/* <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          overflow: "hidden",
        }}
      > */}
      {/* <Search /> */}
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
            backgroundColor: "white",
            padding: "10px",
            width: "500px",
            borderRadius: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <DateInput startDate={startDate} endDate={endDate} />
        </div>

        {showAlert && (
          <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MKAlert color="error" dismissible sx={{ width: "540px" }}>
              <Icon fontSize="small">warning</Icon>&nbsp; Favor de seleccionar una fecha para
              validar la disponibilidad
            </MKAlert>
          </Container>
        )}
        <Places />
        {/* <Testimonials />
        <Faq />
        <Contact /> */}
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
        </Container>
        <Offers
          cards={[
            {
              variant: "contained",
              color: "primary",
              icon: "shuffle_on",
              title: "Oferta 1",
              description:
                "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
            },
            {
              variant: "gradient",
              color: "primary",
              icon: "beenhere",
              title: "Oferta 2",
              description:
                "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
            },
            {
              variant: "contained",
              color: "primary",
              icon: "ballot",
              title: "Oferta 3",
              description:
                "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
            },
          ]}
        />
        <Places2 />
      </Container>
      {/* </Card> */}
    </>
  );
}

export default Options;
