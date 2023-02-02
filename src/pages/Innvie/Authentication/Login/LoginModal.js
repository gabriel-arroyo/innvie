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

import { useState } from "react"

// @mui material components
import Container from "@mui/material/Container"
import Modal from "@mui/material/Modal"
// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import Login from "."

function LoginModal() {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)

  return (
    <MKBox component="section" py={0}>
      <Container>
        <MKBox mt={0} mb={0} textAlign="center">
          <MKTypography variant="button" color="text">
            ¿Ya tienes una cuenta?{" "}
            <MKButton variant="text" color="info" onClick={toggleModal}>
              Login
            </MKButton>
          </MKTypography>
        </MKBox>

        <Modal
          open={show}
          onClose={toggleModal}
          sx={{
            display: "grid",
            placeItems: "center",
            height: "94vh",
            overflowY: "scroll",
            paddingTop: "3vh",
          }}
        >
          <MKBox
            position="relative"
            width="70%"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            bgColor="white"
            shadow="xl"
          >
            <Login modal />
          </MKBox>
        </Modal>
      </Container>
    </MKBox>
  )
}

export default LoginModal
