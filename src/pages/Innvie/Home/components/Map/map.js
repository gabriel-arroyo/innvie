import React from "react";
import { Box } from "@mui/material";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";

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
        >
          <iframe
            width="100%"
            height="400"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="map"
          />
        </Box>
        <MKTypography variant="body1" color="white" mb={4} align="center" mt={2}>
          Adress 1234, City, State, Zip
        </MKTypography>
      </Container>
    </MKBox>
  );
}

export default Map;
