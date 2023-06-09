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
import { useNavigate } from "react-router-dom"
// @mui material components
import Container from "@mui/material/Container"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"
import Slide from "@mui/material/Slide"

// @mui icons
import CloseIcon from "@mui/icons-material/Close"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import useUser from "api/useUser"

function LogoutModal() {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const { logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <MKBox>
      <MKTypography
        variant="button"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minWidth="12rem"
        color="text"
        fontWeight="regular"
        py={0.625}
        px={2}
        sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
          borderRadius: borderRadius.md,
          cursor: "pointer",
          transition: "all 300ms linear",

          "&:hover": {
            backgroundColor: grey[200],
            color: dark.main,

            "& *": {
              color: dark.main,
            },
          },
        })}
        onClick={toggleModal}
      >
        Logout
      </MKTypography>
      <Container>
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
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="30%"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Close session</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2} display="flex" alignItems="center">
                <MKTypography variant="body2" color="text" display="flex" alignItems="center">
                  Are you sure you want to close your session?
                </MKTypography>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="error" onClick={handleLogout}>
                  Logout
                </MKButton>
                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                  close
                </MKButton>
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </Container>
    </MKBox>
  )
}

export default LogoutModal
