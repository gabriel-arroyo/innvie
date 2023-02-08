import { Card, Container } from "@mui/material"
import useCalendar from "api/useCalendar"
import { useEffect } from "react"

function Ocupancy() {
  const { ocupancy, getOcupancy } = useCalendar({ type: null, startDate: null, endDate: null })
  useEffect(() => {
    getOcupancy()
  }, [])
  return (
    <Container sx={{ mb: "20px" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          fontSize: "1.5rem",
        }}
      >
        <p>Ocupación hoy: </p>
        <p style={{ fontWeight: "bold", color: "red" }}>{ocupancy}%</p>
      </Card>
    </Container>
  )
}

export default Ocupancy
