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
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";

// Pricing page components

import { v4 as uuidv4 } from "uuid";
// Images
// import bg1 from "assets/images/bg2.jpg";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import React from "react";
import Offers from "../components/Offers/offers";

function OffersSwipe({ cards }) {
  const matches = useMediaQuery("(min-width:1000px)");
  console.log(matches);
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
        {matches && (
          <SwiperSlide key={uuidv4()}>
            <MKBox component="section" py={7}>
              <Container>
                <Offers cards={cards} />
              </Container>
            </MKBox>
          </SwiperSlide>
        )}
        {!matches &&
          cards.map((page) => (
            <SwiperSlide key={uuidv4()}>
              <MKBox component="section" py={7}>
                <Container>
                  <Offers cards={[page]} />
                </Container>
              </MKBox>
            </SwiperSlide>
          ))}
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

OffersSwipe.propTypes = {
  cards: PropTypes.instanceOf(Array).isRequired,
};
