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
import { useState } from "react"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
// Otis Kit PRO examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Rental page sections
// import Search from "pages/LandingPages/Rental/sections/Search";
// import Testimonials from "pages/LandingPages/Rental/sections/Testimonials";
// import Faq from "pages/LandingPages/Rental/sections/Faq";
// import Contact from "pages/LandingPages/Rental/sections/Contact";

// Images
import bgImage from "assets/images/bg-rental.jpeg"
import { v4 as uuid } from "uuid"
import loggedUser from "states/loggedUser"
import { useAtom } from "jotai"
import useMyReservations from "api/useMyReservations"
import FaqCollapse from "./components/collapse"

function MyReservations() {
  const [collapse, setCollapse] = useState(false)
  const [currentUser] = useAtom(loggedUser)
  const { calendar } = useMyReservations({ email: currentUser?.email })

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
              Mis Reservaciones
            </MKTypography>
            <MKTypography variant="body1" color="white" mt={1}>
              Datos de mis visitas pasadas y pendientes
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
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
      >
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
              {calendar.map((item, i) => (
                <FaqCollapse
                  key={uuid()}
                  title={`Reservación ${calendar.length - i}`}
                  user={currentUser}
                  event={item}
                  open={collapse === i + 1}
                  onClick={() => (collapse === i + 1 ? setCollapse(false) : setCollapse(i + 1))}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  )
}

export default MyReservations
