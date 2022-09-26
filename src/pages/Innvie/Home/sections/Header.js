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
import SliderBackground from "pages/Innvie/Home/components/Background";

// Images
// import bg1 from "assets/images/bg2.jpg";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import DateInput from "../components/Date/DateInput";
import bg1 from "../../../../assets/images/photos/IMG_0613.JPG";
import bg2 from "../../../../assets/images/photos/IMG_0331.JPG";
import bg3 from "../../../../assets/images/photos/IMG_0369.JPG";

function Header() {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation]);

  return (
    <>
      <Swiper
        autoplay={{ delay: 5000 }}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop
        style={{ height: "75vh" }}
      >
        <SwiperSlide>
          <SliderBackground image={bg1} />
        </SwiperSlide>
        <SwiperSlide>
          <SliderBackground image={bg3} />
        </SwiperSlide>
        <SwiperSlide>
          <SliderBackground image={bg2} />
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
      >
        <Container>
          <Card
            sx={{
              ml: "18vw",
              mr: "18vw",
              p: "10px",
              display: "flex",
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            <DateInput />
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Header;
