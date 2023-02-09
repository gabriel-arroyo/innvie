/* eslint-disable import/no-unresolved */
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

// SwiperJS
import SwiperCore, { Autoplay, Navigation } from "swiper"
import MKTypography from "components/MKTypography"
// SwiperJS react components
import { Swiper, SwiperSlide } from "swiper/react"
import useMediaQuery from "@mui/material/useMediaQuery"

// SwiperJS styles
import "swiper/css"
import "swiper/css/navigation"

// Pricing page components

// Images
// import bg1 from "assets/images/bg2.jpg";
import Container from "@mui/material/Container"
import MKBox from "components/MKBox"
import Grid from "@mui/material/Grid"
import PlacesCards from "./PlacesCards"
// import PlacesCards2 from "./PlacesCards2";

function PlacesSwipe() {
  const matches = useMediaQuery("(min-width:1000px)")
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation])

  return (
    <div style={{ marginBottom: "20px" }}>
      <Grid
        container
        item
        xs={12}
        lg={12}
        flexDirection="column"
        alignItems="center"
        sx={{ textAlign: "center", my: 0, mx: "auto" }}
      >
        <MKTypography variant="h2" fontWeight="bold" pb={2} color="white">
          Near places
        </MKTypography>
      </Grid>
      <Swiper
        autoplay={{ delay: 5000 }}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop
        style={{ height: "100%" }}
      >
        <SwiperSlide>
          <MKBox component="section" py={7}>
            <Container>
              <PlacesCards number={matches ? 3 : 1} />
            </Container>
          </MKBox>
        </SwiperSlide>
        {!matches && (
          <>
            <SwiperSlide>
              <MKBox component="section" py={7}>
                <Container>
                  <PlacesCards number={matches ? 3 : 1} />
                </Container>
              </MKBox>
            </SwiperSlide>
            <SwiperSlide>
              <MKBox component="section" py={7}>
                <Container>
                  <PlacesCards number={matches ? 3 : 1} />
                </Container>
              </MKBox>
            </SwiperSlide>
          </>
        )}
      </Swiper>
      <div
        style={{
          position: "absolute",
          top: "13vh",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />
    </div>
  )
}

export default PlacesSwipe
