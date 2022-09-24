import React from "react";
// react-router-dom components
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKDatePicker from "components/MKDatePicker";
import MKTypography from "components/MKTypography";

function DateInput() {
  return (
    <Grid
      container
      spacing={3}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid
        item
        xs={12}
        lg={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <MKTypography variant="h6" color="primary">
          Fecha inicial / final
        </MKTypography>
        <MKDatePicker
          type="date"
          options={{ mode: "range" }}
          variant="standard"
          placeholder="Please select date"
          fullWidth
          sx={{ width: "20vw", p: "20px" }}
        />
        {/* <MKInput type="date" label="Date" value="2018-11-23" sx={{ width: "20vw" }} /> */}
      </Grid>
      <Grid
        item
        xs={12}
        lg={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <MKTypography variant="h6" color="primary">
          Días
        </MKTypography>
        <MKInput type="number" value="2" sx={{ width: "60px" }} />
      </Grid>
      <Grid item xs={12} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
        <MKButton
          component={Link}
          to="/pages/landing-pages/rental"
          variant="gradient"
          color="primary"
          sx={{ width: "700px" }}
        >
          Ver Opciones
        </MKButton>
      </Grid>
    </Grid>
  );
}

export default DateInput;
