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
import SwiperCore, { Autoplay, Navigation } from "swiper";
// SwiperJS react components
import { Swiper, SwiperSlide } from "swiper/react";

// SwiperJS styles
import "swiper/css";
import "swiper/css/navigation";

// Pricing page components

// Images
// import bg1 from "assets/images/bg2.jpg";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import Offers from "../components/Offers/offers";

function OffersSwipe() {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation]);

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
      />
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
              <Offers
                cards={[
                  {
                    variant: "gradient",
                    color: "primary",
                    icon: "shuffle_on",
                    title: "6x5",
                    description: "Hospédate con nosotros 6 noches y paga solamente 5.",
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
                    variant: "gradient",
                    color: "primary",
                    icon: "ballot",
                    title: "Oferta 3",
                    description:
                      "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
                  },
                ]}
              />
            </Container>
          </MKBox>
        </SwiperSlide>
        <SwiperSlide>
          <MKBox component="section" py={7}>
            <Container>
              <Offers
                cards={[
                  {
                    variant: "gradient",
                    color: "primary",
                    icon: "shuffle_on",
                    title: "6x5",
                    description: "Hospédate con nosotros 6 noches y paga solamente 5.",
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
                    variant: "gradient",
                    color: "primary",
                    icon: "ballot",
                    title: "Oferta 3",
                    description:
                      "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
                  },
                ]}
              />
            </Container>
          </MKBox>
        </SwiperSlide>
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
  );
}

export default OffersSwipe;
