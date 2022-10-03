import React from "react";
// react-router-dom components
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";

import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKDatePicker from "components/MKDatePicker";
import MKTypography from "components/MKTypography";
import { getTomorrowDate, getCurrentDate, getDaysDifference } from "tools/getDate";
import { useAtom } from "jotai";
import { reservedEndDate, reservedStartDate, reservedDays } from "states/reservedDate";

function DateInput({ startDate, endDate }) {
  const matches = useMediaQuery("(min-width:1000px)");
  const [stateStartDate, setStartDate] = useAtom(reservedStartDate);
  const [stateEndDate, setEndDate] = useAtom(reservedEndDate);
  const [stateDays, setDays] = useAtom(reservedDays);
  const onChangeDate = (e) => {
    const [start, end] = e;
    setStartDate(getCurrentDate(start));
    setEndDate(getCurrentDate(end));
    setDays(getDaysDifference(start, end));
  };
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: matches ? "500px" : "300px",
      }}
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
        <MKInput type="text" value={stateDays} sx={{ width: "50px", pointerEvents: "none" }} />
      </Grid>
      <Grid
        item
        xs={5}
        lg={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "self-end",
        }}
      >
        <MKButton
          component={Link}
          to={`/options/${stateStartDate}/${stateEndDate}`}
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

DateInput.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

DateInput.defaultProps = {
  startDate: getCurrentDate(),
  endDate: getTomorrowDate(),
};
