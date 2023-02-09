import React from "react"
import MKBox from "components/MKBox"
import { Outlet } from "react-router-dom"
import DefaultNavbar from "examples/Navbars/DefaultNavbarES"
import CenteredFooter from "examples/Footers/CenteredFooter"
import footerRoutes from "../../../../footer.routes"
import img from "../../../../assets/images/innvie/logos/logo-stay-white.svg"

function Layout() {
  return (
    <>
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar logoUrl={img} transparent relative sticky />
      </MKBox>
      <main>
        <Outlet />
      </main>
      <MKBox pt={6} px={1} mt={6} sx={{ backgroundColor: "#bc2f2c" }}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  )
}

export default Layout
