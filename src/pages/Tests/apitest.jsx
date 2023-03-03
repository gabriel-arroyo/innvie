import useCalendar from "api/useCalendar"
import { useEffect, useState } from "react"
import "react-calendar-timeline/lib/Timeline.css"

function ApiTest() {
  const { getAvailableTypes } = useCalendar({
    type: "Sinlge",
    startDate: "2023-03-01",
    endDate: "2023-03-08",
  })
  const [types, setTypes] = useState([])
  useEffect(() => {
    getAvailableTypes("2023-03-01", "2023-03-08").then((res) => setTypes(res))
  }, [])
  return (
    <>
      <p>Types availability</p>
      <p>{JSON.stringify(types)}</p>
    </>
  )
}

export default ApiTest
