import React from "react";
import { Box } from "@mui/material";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import "./map.css";

function Map() {
  return (
    <MKBox component="section" py={{ xs: 0, lg: 6 }} borderRadius="lg">
      <Container sx={{ borderRadius: "50px" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#fff"
          borderRadius="lg"
          className="map"
        >
          <iframe
            className="map"
            width="100%"
            height="400"
            id="gmap_canvas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.9552229575575!2d-83.24118914906394!3d42.172639354807366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b386d9d9448d9%3A0x7718deb66310f8f8!2s18732%20Dix%20Toledo%20Rd%2C%20Brownstown%20Charter%20Twp%2C%20MI%2048193%2C%20EE.%20UU.!5e0!3m2!1ses-419!2smx!4v1674868359537!5m2!1ses-419!2smx"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="map"
          />
        </Box>
        <MKTypography variant="body1" color="white" mb={4} align="center" mt={2}>
          18732 Dix Toledo HWY, Brownstown MI 48193
        </MKTypography>
      </Container>
    </MKBox>
  );
}

export default Map;
