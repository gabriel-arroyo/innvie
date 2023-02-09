// react-router-dom components
import useMediaQuery from "@mui/material/useMediaQuery"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import Grid from "@mui/material/Grid"
import MKButton from "components/MKButton"
import MKDatePicker from "components/MKDatePicker"
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography"
import { useAtom } from "jotai"
import { reservedDays, reservedEndDate, reservedStartDate } from "states/reservedDate"
import { getCurrentDate, getDaysDifference, getTomorrowDate } from "tools/getDate"

function DateInput({ startDate, endDate }) {
  const matches = useMediaQuery("(min-width:1000px)")
  const [, setStartDate] = useAtom(reservedStartDate)
  const [, setEndDate] = useAtom(reservedEndDate)
  const [days, setDays] = useAtom(reservedDays)
  const onChangeDate = (e) => {
    const [start, end] = e
    setStartDate(getCurrentDate(start))
    setEndDate(getCurrentDate(end))
    setDays(getDaysDifference(start, end))
  }
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
        sm={10}
        xs={10}
        lg={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <MKTypography variant="h6" color="primary">
          Start / End date
        </MKTypography>
        <MKDatePicker
          type="date"
          options={{
            mode: "range",
            defaultDate: [startDate, endDate],
            minDate: "2022-02-03",
            maxDate: "2024-03-03",
          }}
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
          Days
        </MKTypography>
        <MKInput type="text" value={days} sx={{ width: "50px", pointerEvents: "none" }} />
      </Grid>
      <Grid
        item
        xs={8}
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
          See options
        </MKButton>
      </Grid>
    </Grid>
  )
}

export default DateInput

DateInput.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
}

DateInput.defaultProps = {
  startDate: getCurrentDate(),
  endDate: getTomorrowDate(),
}
