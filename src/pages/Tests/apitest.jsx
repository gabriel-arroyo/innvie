import { Card } from "@mui/material"
import useCheckin from "api/useCheckin"
import "react-calendar-timeline/lib/Timeline.css"
import JSONPretty from "react-json-pretty"

function ApiTest() {
  const { currentEvent, getCurrentEvent, updateEventWithCheckin } = useCheckin()
  const handleClick = async () => {
    const event = await getCurrentEvent()
    console.log("🚀 ~ file: apitest.jsx:8 ~ handleClick ~ event", event)
  }
  const handleCheckin = async () => {
    if (!currentEvent.id) return
    await updateEventWithCheckin()
  }
  return (
    <Card>
      <h1>Test</h1>
      <button type="button" onClick={handleClick}>
        test
      </button>

      <button type="button" disabled={!currentEvent.id} onClick={handleCheckin}>
        ckeckin
      </button>
      <JSONPretty data={currentEvent} />
    </Card>
  )
}

export default ApiTest
