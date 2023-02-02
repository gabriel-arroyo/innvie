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

/* eslint-disable react/prop-types */
import { useState } from "react"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"
import Slide from "@mui/material/Slide"
import { parseDate } from "tools/getDate"

// @mui icons
import CloseIcon from "@mui/icons-material/Close"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import MKDatePicker from "components/MKDatePicker"

function ReserveModal({ event }) {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)

  const onChangeDate = () => {
    console.log("changed")
  }

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
          <MKButton variant="gradient" color="info" onClick={toggleModal}>
            Cambiar reservación
          </MKButton>
        </Grid>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Cambiar reservación</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
                <Container>
                  <Grid
                    container
                    item
                    xs={12}
                    lg={12}
                    flexDirection="row"
                    alignItems="center"
                    sx={{ textAlign: "center", my: 0, mx: "auto" }}
                  >
                    <Grid item xs={6} lg={6} flexDirection="column" alignItems="center">
                      <MKTypography variant="body2" color="secondary" fontWeight="bold">
                        Mi reservación
                      </MKTypography>
                      <MKDatePicker
                        options={{ mode: "range", defaultDate: [event.startDate, event.endDate] }}
                        variant="standard"
                        placeholder="Please select date"
                        fullWidth
                        sx={{ width: "20vw", p: "20px" }}
                        onChange={onChangeDate}
                      />
                      <Data text={event.type} />
                      <Data text={parseDate(event.startDate)} />
                      <Data text={parseDate(event.endDate)} />
                    </Grid>
                    <Grid item xs={6} lg={6} flexDirection="column" alignItems="center">
                      <MKTypography variant="body2" color="secondary" fontWeight="bold">
                        Nueva reservación
                      </MKTypography>
                      <Data text={event.type} />
                      <Data text={parseDate(event.startDate)} />
                      <Data text={parseDate(event.endDate)} />
                    </Grid>
                  </Grid>
                </Container>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                  close
                </MKButton>
                <MKButton variant="gradient" color="error">
                  Aceptar cambios
                </MKButton>
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </Container>
    </MKBox>
  )
}

export default ReserveModal

function Data({ text }) {
  return (
    <MKTypography variant="body2" color="text" fontWeight="regular">
      {text}
    </MKTypography>
  )
}
