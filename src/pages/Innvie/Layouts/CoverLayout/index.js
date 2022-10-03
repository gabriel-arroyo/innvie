import React from "react";
import MKBox from "components/MKBox";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import footerRoutes from "footer.routes";
import CenteredFooter from "examples/Footers/CenteredFooter";
import image from "assets/images/bg-sign-in-cover.jpeg";
import routes from "../../../../innvie.routes";

function CoverLayout() {
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
        width="calc(100% - 2rem)"
        minHeight="35vh"
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          zIndex: -1,
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
      <main>
        <MKBox mt={{ xs: -20, lg: -18 }} px={1}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Outlet />
            </Grid>
          </Grid>
        </MKBox>
      </main>
      <MKBox pt={6} px={1} mt={6} sx={{ backgroundColor: "#bc2f2c" }}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default CoverLayout;
