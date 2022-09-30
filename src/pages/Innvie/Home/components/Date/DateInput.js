import React from "react";
// react-router-dom components
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKDatePicker from "components/MKDatePicker";
import MKTypography from "components/MKTypography";

function DateInput({ startDate, endDate }) {
  const onChangeDate = (e) => {
    console.log(e); // value picked from date picker
  };
  return (
    <Grid
      container
      spacing={3}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "500px" }}
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
          options={{ mode: "range", defaultDate: [startDate, endDate] }}
          variant="standard"
          placeholder="Please select date"
          fullWidth
          sx={{ width: "20vw", p: "20px" }}
          onChange={onChangeDate}
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
      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "self-end",
        }}
      >
        <MKButton
          component={Link}
          to="/options"
          variant="gradient"
          color="error"
          sx={{ width: "500px", padding: "14px" }}
        >
          Ver Opciones
        </MKButton>
      </Grid>
    </Grid>
  );
}

export default DateInput;

const getCurrentDate = () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return currentDate;
};
const getTomorrowDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return currentDate;
};
DateInput.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

DateInput.defaultProps = {
  startDate: getCurrentDate(),
  endDate: getTomorrowDate(),
};
