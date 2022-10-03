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
import { useState } from "react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import FaqCollapse from "pages/Support/HelpCenter/components/FaqCollapse";
// Otis Kit PRO examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Rental page sections
// import Search from "pages/LandingPages/Rental/sections/Search";
// import Testimonials from "pages/LandingPages/Rental/sections/Testimonials";
// import Faq from "pages/LandingPages/Rental/sections/Faq";
// import Contact from "pages/LandingPages/Rental/sections/Contact";

// Images
import bgImage from "assets/images/bg-rental.jpeg";
import Reservation from "./components/reservation";

function MyReservations() {
  const [collapse, setCollapse] = useState(false);
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
              <FaqCollapse
                title="Reservación 4"
                open={collapse === 1}
                onClick={() => (collapse === 1 ? setCollapse(false) : setCollapse(1))}
              >
                <Reservation />
              </FaqCollapse>
              <FaqCollapse
                title="Reservación 3"
                open={collapse === 2}
                onClick={() => (collapse === 2 ? setCollapse(false) : setCollapse(2))}
              >
                It really matters and then like it really doesn&apos;t matter. What matters is the
                people who are sparked by it. And the people who are like offended by it, it
                doesn&apos;t matter. Because it&apos;s about motivating the doers. Because I&apos;m
                here to follow my dreams and inspire other people to follow their dreams, too.
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to
                express ourselves and actualize our dreams. If you have the opportunity to play this
                game of life you need to appreciate every moment. A lot of people don&apos;t
                appreciate the moment until it&apos;s passed.
              </FaqCollapse>
              <FaqCollapse
                title="Reservación 3"
                open={collapse === 3}
                onClick={() => (collapse === 3 ? setCollapse(false) : setCollapse(3))}
              >
                The time is now for it to be okay to be great. People in this world shun people for
                being great. For being a bright color. For standing out. But the time is now to be
                okay to be the greatest you. Would you believe in what you believe in, if you were
                the only one who believed it? If everything I did failed - which it doesn&apos;t, it
                actually succeeds - just the fact that I&apos;m willing to fail is an inspiration.
                People are so scared to lose that they don&apos;t even try. Like, one thing people
                can&apos;t say is that I&apos;m not trying, and I&apos;m not trying my hardest, and
                I&apos;m not trying to do the best way I know how.
              </FaqCollapse>
              <FaqCollapse
                title="Reservación 2"
                open={collapse === 4}
                onClick={() => (collapse === 4 ? setCollapse(false) : setCollapse(4))}
              >
                I always felt like I could do anything. That&apos;s the main thing people are
                controlled by! Thoughts- their perception of themselves! They&apos;re slowed down by
                their perception of themselves. If you&apos;re taught you can&apos;t do anything,
                you won&apos;t do anything. I was taught I could do everything.
                <br />
                <br />
                If everything I did failed - which it doesn&apos;t, it actually succeeds - just the
                fact that I&apos;m willing to fail is an inspiration. People are so scared to lose
                that they don&apos;t even try. Like, one thing people can&apos;t say is that
                I&apos;m not trying, and I&apos;m not trying my hardest, and I&apos;m not trying to
                do the best way I know how.
              </FaqCollapse>
              <FaqCollapse
                title="Reservación 1"
                open={collapse === 5}
                onClick={() => (collapse === 5 ? setCollapse(false) : setCollapse(5))}
              >
                There&apos;s nothing I really wanted to do in life that I wasn&apos;t able to get
                good at. That&apos;s my skill. I&apos;m not really specifically talented at anything
                except for the ability to learn. That&apos;s what I do. That&apos;s what I&apos;m
                here for. Don&apos;t be afraid to be wrong because you can&apos;t learn anything
                from a compliment. I always felt like I could do anything. That&apos;s the main
                thing people are controlled by! Thoughts- their perception of themselves!
                They&apos;re slowed down by their perception of themselves. If you&apos;re taught
                you can&apos;t do anything, you won&apos;t do anything. I was taught I could do
                everything.
              </FaqCollapse>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default MyReservations;
