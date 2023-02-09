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
import Divider from "@mui/material/Divider"
import Slide from "@mui/material/Slide"

// @mui icons
import CloseIcon from "@mui/icons-material/Close"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"

function TermsModal() {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)

  return (
    <MKBox component="section" py={6}>
      <Container>
        <MKButton variant="text" color="info" onClick={toggleModal}>
          Terms & Conditions
        </MKButton>
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
              width="70%"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Terms & Conditions</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
                <MKTypography variant="h5" mt={6} mb={3}>
                  Occupancy at Innvie Motel
                </MKTypography>
                <MKTypography variant="body2" color="text">
                  The number of adults should include all occupants 21 years of age and older. All
                  guests registering must be 21 years of age and must present photo identification
                  upon check-in. Children 17 years of age and under are free when occupying the same
                  room with an adult family member. Occupancy may be restricted by local ordinance.
                  Generally, one or two persons may occupy a room with one bed. No more than four
                  persons may occupy a room with two beds. Check-in and Check-out Dates You may book
                  up to one year in advance, based on availability. The maximum number of days that
                  you may book online is 28. All guests registering must be 18 years of age or older
                  (19-21 years of age required at some locations) and must present photo
                  identification upon check-in. Payment for your accommodations required at check-in
                  with an accepted credit card or cash. For third-party credit card payments,
                  contact the location.
                </MKTypography>
                <MKTypography variant="h5" mt={6} mb={3}>
                  Check-in and Check-out times
                </MKTypography>
                <MKTypography variant="h6" mt={6} mb={3}>
                  Check-in time
                </MKTypography>
                <MKTypography variant="body2" color="text">
                  Anytime based on availability (This may vary by location and on special event
                  dates and /or weekends). Rooms are typically available after 3 pm. Guest should
                  contact location on day of arrival for specific times if needed.
                </MKTypography>
                <MKTypography variant="h6" mt={6} mb={3}>
                  Check-out time
                </MKTypography>
                <MKTypography variant="body2" color="text">
                  12 noon (Time varies by location). Late check-outs must be approved and arranged
                  with front desk personnel prior to check-out time.
                </MKTypography>
                <MKTypography variant="h5" mt={6} mb={3}>
                  Clean request service
                </MKTypography>
                <MKTypography variant="body2" color="text">
                  Weekly rate includes one cleaning service per week
                </MKTypography>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
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

export default TermsModal
