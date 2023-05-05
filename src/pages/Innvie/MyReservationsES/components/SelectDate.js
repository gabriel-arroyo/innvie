/* eslint-disable react/prop-types */
import PayButton from "pages/Innvie/Reserve/PayButton"
import MKTypography from "components/MKTypography"
import Grid from "@mui/material/Grid"
import MKDatePicker from "components/MKDatePicker"
import { useEffect, useState } from "react"
import useType from "api/useType"
import roundTo from "tools/round"
import { getDaysDifference, isBefore, parseDate, removeDateRange } from "../../../../tools/getDate"

function SelectDate({ startDate, endDate, type }) {
  const [newStart, setNewStart] = useState(startDate)
  const [newEnd, setNewEnd] = useState(endDate)
  const [days, setDays] = useState()
  const [unpaidStart, setUnpaidStart] = useState()
  const [unpaidEnd, setUnpaidEnd] = useState()
  const [dateDifference, setDateDifference] = useState(false)
  const { getPriceByName, price } = useType()
  console.log("🚀 ~ file: reservation.js:84 ~ SelectDate ~ price", price)
  const [before, setBefore] = useState(false)

  const onChangeDate = (e) => {
    const [estart, eend] = e
    const start = parseDate(estart)
    const end = parseDate(eend)
    setNewStart(start)
    setNewEnd(end)
    const result = removeDateRange(start, end, startDate, endDate)
    setUnpaidStart(result.startDate)
    setUnpaidEnd(result.endDate)
    setDateDifference(start !== startDate || end !== endDate)
  }
  const onApprove = () => {
    console.log("🚀 ~ file: reservation.js:82 ~ onChangeDate ~ start", newStart)
    console.log("🚀 ~ file: reservation.js:82 ~ onChangeDate ~ end", newEnd)
  }
  useEffect(() => {
    const calcDays = getDaysDifference(newStart, newEnd)
    const b = isBefore(newEnd, endDate)
    setBefore(b)
    setDays(calcDays)
    getPriceByName(type)
  }, [newEnd])
  return (
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
      <MKTypography variant="body2">{days} Noches</MKTypography>
      <MKTypography variant="h6" color="primary" sx={{ width: "200px", textAlign: "center" }}>
        Fecha inicial / final
      </MKTypography>
      <MKDatePicker
        type="date"
        options={{ mode: "range", defaultDate: [startDate, endDate] }}
        startDate={startDate}
        endDate={endDate}
        variant="standard"
        placeholder="Please select date"
        fullWidth
        sx={{ width: "20vw", p: "20px" }}
        onChange={onChangeDate}
      />
      {dateDifference && !before && (
        <>
          <MKTypography variant="body3" width={180} textAlign="center" color="error">
            Las siguientes fechas están disponibles:
          </MKTypography>
          <MKTypography variant="body3" width={180} textAlign="center" color="error">
            {unpaidStart} to {unpaidEnd}
          </MKTypography>
          <MKTypography variant="body" color="error" fontWeight="bold" my={2}>
            Cambiar reservación
          </MKTypography>
          <MKTypography>
            Precio total: ${roundTo(price * days + price * days * 4.08, 2)}
          </MKTypography>
          <PayButton price={price * days + price * days * 4.08} onApprove={onApprove} />
        </>
      )}
      {dateDifference && before && (
        <MKTypography variant="body3" textAlign="center" color="error">
          Para solicitar su devolución favor de pasar al mostrador principal
        </MKTypography>
      )}
    </Grid>
  )
}

export default SelectDate
