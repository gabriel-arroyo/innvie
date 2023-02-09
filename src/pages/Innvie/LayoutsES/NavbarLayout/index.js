import React from "react"
import MKBox from "components/MKBox"
import { Outlet } from "react-router-dom"
import DefaultNavbar from "examples/Navbars/DefaultNavbarES"

function NavbarLayout() {
  return (
    <>
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          logoUrl="https://firebasestorage.googleapis.com/v0/b/innvie-6e09a.appspot.com/o/logo-blanco.png?alt=media&token=e4c69723-59be-4dfc-b1b7-b1d5c3f2513f"
          transparent
          relative
          sticky
        />
      </MKBox>
      <main>
        <Outlet />
      </main>
      <MKBox pt={6} px={1} mt={6} sx={{ backgroundColor: "transparent" }} />
    </>
  )
}

export default NavbarLayout
