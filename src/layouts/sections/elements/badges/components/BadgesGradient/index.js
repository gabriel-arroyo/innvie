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
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKBadge from "components/MKBadge"

function BadgesGradient() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <MKBadge badgeContent="primary" color="primary" container />
            <MKBadge badgeContent="secondary" color="secondary" container />
            <MKBadge badgeContent="success" color="success" container />
            <MKBadge badgeContent="error" color="error" container />
            <MKBadge badgeContent="warning" color="warning" container />
            <MKBadge badgeContent="info" color="info" container />
            <MKBadge badgeContent="light" color="light" container />
            <MKBadge badgeContent="dark" color="dark" container />
          </Stack>
        </Grid>
      </Container>
    </MKBox>
  )
}

export default BadgesGradient
