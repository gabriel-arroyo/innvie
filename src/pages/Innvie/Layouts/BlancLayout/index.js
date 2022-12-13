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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples

// Routes

function BlancLayout({ title, children }) {
  return (
    <MKBox display="flex" flexDirection="column" minHeight="100vh">
      <MKBox bgColor="white" shadow="sm" py={0.25} />
      <Container sx={{ mt: 6 }}>
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          <MKBox width={{ xs: "100%", md: "50%", lg: "100%" }} mb={10}>
            <br />
          </MKBox>
          <MKTypography
            variant="h3"
            mb={1}
            color="white"
            justifyContent="center"
            textAlign="center"
          >
            {title}
          </MKTypography>
          {children}
        </Grid>
      </Container>
    </MKBox>
  );
}

// Typechecking props for the BaseLayout
BlancLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BlancLayout;
