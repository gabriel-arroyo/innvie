/* eslint-disable react/prop-types */
import SelectPicker from "components/Innvie/SelectPicker"
import MKBox from "components/MKBox"
import MKDatePicker from "components/MKDatePicker"
import MKTypography from "components/MKTypography"
import { useEffect } from "react"
import useCalendar from "api/useCalendar"

function Comparator({
  title,
  disabled,
  handleChangeName,
  reservation,
  onChangeDate,
  startIsPast,
  endIsPast,
}) {
  const { getAvailableTypes, typesNames } = useCalendar({
    type: reservation.type,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
  })
  useEffect(() => {
    getAvailableTypes(reservation.startDate, reservation.endDate, reservation.type)
  }, [])
  return (
    <MKBox width={230}>
      <MKTypography variant="body2" color="secondary" fontWeight="bold">
        {title}
      </MKTypography>
      <SelectPicker
        options={typesNames}
        name="type"
        label="Tipo de habitación"
        onChange={handleChangeName}
        value={reservation.type}
        disabled={disabled || endIsPast}
        sx={{ my: "25px", width: "180px" }}
      />
      <MKTypography variant="body2">
        {startIsPast && !endIsPast ? "La fecha de incio ya ha pasado" : ""}
      </MKTypography>
      <MKTypography variant="body2">
        {endIsPast && endIsPast ? "Esta reservación ya venció, no puede modificarse" : ""}
      </MKTypography>
      <MKDatePicker
        options={{
          mode: startIsPast ? "single" : "range",
          defaultDate: [reservation.startDate, reservation.endDate],
          allowInvalidPreload: true,
          minDate: "today",
        }}
        startDate={reservation.startDate}
        endDate={reservation.endDate}
        variant="standard"
        placeholder="Please select date"
        fullWidth
        sx={{ my: "20px", width: "180px" }}
        onChange={onChangeDate}
        disabled={disabled || endIsPast}
      />
      <Data text={`${reservation.days} Noche${reservation.days !== 1 ? "s" : ""}`} />
      <MKTypography variant="caption">Precio por noche:</MKTypography>
      <MKTypography>${reservation.price}.00</MKTypography>
      <MKTypography variant="caption">Precio total</MKTypography>
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
