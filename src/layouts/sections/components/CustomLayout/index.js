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
import PropTypes from "prop-types"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
// import Icon from "@mui/material/Icon"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"

// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar"
import CenteredFooter from "examples/Footers/CenteredFooter"

// Routes
import { Box } from "@mui/material"

function CustomLayout({ title, subtitle, children }) {
  return (
    <MKBox display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          action={{
            type: "external",
            route: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
            // label: (
            //   // <MKTypography
            //   //   color="white"
            //   //   fontWeight="regular"
            //   //   textTransform="capitalize"
            //   //   fontSize="small"
            //   // >
            //   //   <Icon>print</Icon>
            //   //   &nbsp;&nbsp;Imprimir
            //   // </MKTypography>
            // ),
            // color: "info",
          }}
          transparent
          relative
        />
      </MKBox>
      <Container sx={{ mt: 6 }}>
        <Grid
          container
          item
          xs={12}
          flexDirection="column"
          justifyContent="center"
          mx="auto"
          width="fit-content"
        >
          <Box width="100%" display="flex" justifyContent="center" mb={3}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/innvie-6e09a.appspot.com/o/logo-azul.png?alt=media&token=609c519b-5244-4f6e-b05a-4a6781442f84"
              alt="confirmation"
              width="15%"
            />
          </Box>
          <MKTypography variant="h3" mb={1} sx={{ textAlign: "center", width: "auto" }}>
            {title}
          </MKTypography>
          <MKTypography variant="body1" mb={1} sx={{ textAlign: "center", width: "fit-content" }}>
            {subtitle}
          </MKTypography>
          {children}
        </Grid>
      </Container>
      <MKBox mt="auto">
        <CenteredFooter />
      </MKBox>
    </MKBox>
  )
}

// Typechecking props for the CustomLayout
CustomLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
}

CustomLayout.defaultProps = {
  subtitle: "",
}

export default CustomLayout
