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
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";

// Otis Kit PRO example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Otis Kit PRO page layout routes
import footerRoutes from "footer.routes";
import CenteredFooter from "examples/Footers/CenteredFooter";
import routes from "routes";

function CoverLayout({ coverHeight, image, children }) {
  return (
    <>
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          routes={routes}
          logoUrl="https://firebasestorage.googleapis.com/v0/b/innvie-6e09a.appspot.com/o/logo-blanco.png?alt=media&token=e4c69723-59be-4dfc-b1b7-b1d5c3f2513f"
          transparent
          relative
          sticky
        />
      </MKBox>
      <MKBox
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
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
      <MKBox mt={{ xs: -20, lg: -18 }} px={1} width="100vw" ml={-18}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" width="100vw">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3} pb={9}>
            {children}
          </Grid>
        </Grid>
      </MKBox>

      <MKBox pt={6} px={1} mt={6} sx={{ backgroundColor: "#bc2f2c" }}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
