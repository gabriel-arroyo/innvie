import React from "react";
import MKBox from "components/MKBox";
import { Outlet } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import footerRoutes from "footer.routes";
import CenteredFooter from "examples/Footers/CenteredFooter";
import routes from "../../../../innvie.routes";

function Layout() {
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
      <main>
        <Outlet />
      </main>
      <MKBox pt={6} px={1} mt={6} sx={{ backgroundColor: "#bc2f2c" }}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Layout;
