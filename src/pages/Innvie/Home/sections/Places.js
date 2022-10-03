import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PlacesCards from "./PlacesCards";

function Places() {
  return (
    <MKBox component="section" py={7}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={12}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 0, mx: "auto" }}
        >
          <MKTypography variant="h2" fontWeight="bold" pb={7} color="white">
            Lugares cercanos
          </MKTypography>
          <PlacesCards />
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
