/**
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
import Grid from "@mui/material/Grid"

// Otis Kit PRO components
import MKBox from "components/MKBox"

// Otis Kit PRO example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar"
import SimpleFooter from "examples/Footers/SimpleFooter"

// Otis Kit PRO page layout routes
import routes from "routes"

function BasicLayout({ image, children }) {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
          label: "buy now",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  )
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default BasicLayout
