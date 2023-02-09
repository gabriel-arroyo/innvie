/* eslint-disable react/prop-types */
import SelectPicker from "components/Innvie/SelectPicker"
import MKBox from "components/MKBox"
import MKDatePicker from "components/MKDatePicker"
import MKTypography from "components/MKTypography"
import useType from "api/useType"

function Comparator({
  title,
  disabled,
  handleChangeName,
  reservation,
  onChangeDate,
  startIsPast,
  endIsPast,
}) {
  const { types } = useType()
  return (
    <MKBox width={230}>
      <MKTypography variant="body2" color="secondary" fontWeight="bold">
        {title}
      </MKTypography>
      <SelectPicker
        options={types ? types.map((o) => o.type) : []}
        name="type"
        label="Room type"
        onChange={handleChangeName}
        value={reservation.type}
        disabled={disabled || endIsPast}
        sx={{ my: "25px", width: "180px" }}
      />
      <MKTypography variant="body2">
        {startIsPast && !endIsPast ? "This date has already passed" : ""}
      </MKTypography>
      <MKTypography variant="body2">
        {endIsPast && endIsPast ? "This reservation has expired, it cannot be modified" : ""}
      </MKTypography>
      <MKDatePicker
        options={{
          mode: startIsPast ? "single" : "range",
          defaultDate: [reservation.startDate, reservation.endDate],
          allowInvalidPreload: true,
          minDate: "today",
        }}
        variant="standard"
        placeholder="Please select date"
        fullWidth
        sx={{ my: "20px", width: "180px" }}
        onChange={onChangeDate}
        disabled={disabled || endIsPast}
      />
      <Data text={`${reservation.days} Noche${reservation.days !== 1 ? "s" : ""}`} />
      <MKTypography variant="caption">Price per night:</MKTypography>
      <MKTypography>${reservation.price}.00</MKTypography>
      <MKTypography variant="caption">Total price</MKTypography>
      <MKTypography>${reservation.cost}</MKTypography>
    </MKBox>
  )
}

export default Comparator

function Data({ text }) {
  return (
    <MKTypography
      sx={{ mt: "20px", width: "180px", mx: "auto" }}
      variant="body2"
      color="text"
      fontWeight="regular"
      fullWidth
    >
      {text}
    </MKTypography>
  )
}
