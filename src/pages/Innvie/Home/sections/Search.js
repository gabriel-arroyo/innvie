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
// import Autocomplete from "@mui/material/Autocomplete";

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
// import MKDatePicker from "components/MKDatePicker";
import MKButton from "components/MKButton"

function Search() {
  return (
    <MKBox
      component="section"
      sx={{
        p: 2,
        mx: { xs: 2, lg: 3 },
        mt: -18,
        mb: 4,
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 0, lg: 3 }} sx={{ pt: 2, pb: 3, px: 2, mx: "auto" }}>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              Fecha
            </MKTypography>
            <MKInput type="date" variant="standard" placeholder="Please select date" fullWidth />
            {/* <MKDatePicker
              type="date"
              options={{ mode: "range" }}
              variant="standard"
              placeholder="Please select date"
              fullWidth
            /> */}
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              Días
            </MKTypography>
            2
            {/* <Autocomplete
              defaultValue="1"
              options={["1", "2", "3", "4"]}
              renderInput={(params) => <MKInput {...params} variant="standard" />}
            /> */}
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 4 }}>
            <MKButton variant="gradient" color="info" fullWidth>
              search
            </MKButton>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  )
}

export default Search
