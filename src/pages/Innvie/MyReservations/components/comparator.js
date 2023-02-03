/* eslint-disable react/prop-types */
import SelectPicker from "components/Innvie/SelectPicker"
import MKBox from "components/MKBox"
import MKDatePicker from "components/MKDatePicker"
import MKTypography from "components/MKTypography"
import useType from "api/useType"

function Comparator({ title, disabled, handleChangeName, reservation, onChangeDate }) {
  const { types } = useType()
  return (
    <MKBox width={230}>
      <MKTypography variant="body2" color="secondary" fontWeight="bold">
        {title}
      </MKTypography>
      <SelectPicker
        options={types ? types.map((o) => o.type) : []}
        name="type"
        label="Tipo de habitación"
        onChange={handleChangeName}
        value={reservation.type}
        disabled={disabled}
        sx={{ my: "25px", width: "180px" }}
      />
      <MKDatePicker
        options={{ mode: "range", defaultDate: [reservation.startDate, reservation.endDate] }}
        variant="standard"
        placeholder="Please select date"
        fullWidth
        sx={{ my: "20px", width: "180px" }}
        onChange={onChangeDate}
        disabled={disabled}
      />
      <Data text={`${reservation.days} Noche${reservation.days > 1 ? "s" : ""}`} />
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
      sx={{ my: "20px", width: "180px", mx: "auto" }}
      variant="body2"
      color="text"
      fontWeight="regular"
      fullWidth
    >
      {text}
    </MKTypography>
  )
}
