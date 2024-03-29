/* eslint-disable react/prop-types */
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

// @mui material components
import Container from "@mui/material/Container"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKSnackbar from "components/MKSnackbar"

function ToastAlert({ show, toggle, title, content, color = "error" }) {
  const date = new Date().toLocaleString()
  return (
    <MKBox component="section" py={6}>
      <Container>
        <MKSnackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          color={color}
          icon="notifications"
          title={title}
          content={content}
          dateTime={date}
          open={show}
          close={toggle}
        />
      </Container>
    </MKBox>
  )
}

export default ToastAlert
