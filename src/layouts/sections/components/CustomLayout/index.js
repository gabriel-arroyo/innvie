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
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Routes
import routes from "../../../../innvie.routes";

function CustomLayout({ title, subtitle, children }) {
  return (
    <MKBox display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
            label: (
              <MKTypography
                color="white"
                fontWeight="regular"
                textTransform="capitalize"
                fontSize="small"
              >
                <Icon>print</Icon>
                &nbsp;&nbsp;Imprimir
              </MKTypography>
            ),
            color: "info",
          }}
          transparent
          relative
        />
      </MKBox>
      <Container sx={{ mt: 6 }}>
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          <MKTypography variant="h3" mb={1} sx={{ textAlign: "center" }}>
            {title}
          </MKTypography>
          <MKTypography variant="body1" mb={1} sx={{ textAlign: "center" }}>
            {subtitle}
          </MKTypography>
          {children}
        </Grid>
      </Container>
      <MKBox mt="auto">
        <CenteredFooter />
      </MKBox>
    </MKBox>
  );
}

// Typechecking props for the CustomLayout
CustomLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CustomLayout.defaultProps = {
  subtitle: "",
};

export default CustomLayout;
