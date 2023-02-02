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
// SwiperJS react components
import { Swiper, SwiperSlide } from "swiper/react"

// SwiperJS styles
import "swiper/css"
import "swiper/css/navigation"
import PropTypes from "prop-types"

// Pricing page components

import { v4 as uuidv4 } from "uuid"
// Images
// import bg1 from "assets/images/bg2.jpg";
import React from "react"
import MKBox from "components/MKBox"

function ImageSwipe({ images }) {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation])
  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      speed={800}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
      style={{ height: "300px", width: "100%", margin: "auto" }}
    >
      {images.map((image) => (
        <SwiperSlide key={uuidv4()}>
          <MKBox
            width="100%"
            height="100%"
            borderRadius="lg"
            shadow="md"
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSwipe

ImageSwipe.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired,
}
