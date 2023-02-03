import useFormatedCalendar from "api/useFormatedCalendar"
import { useEffect } from "react"
import moment from "moment"
import Timeline from "react-calendar-timeline"
import "./customTimeline.css"

function CustomTimeline() {
  const { loading, groups, items, getCalendar } = useFormatedCalendar()
  useEffect(() => {
    getCalendar()
  }, [])
  return (
    <div style={{ background: "white" }}>
      Rendered by react!
      <CustomTimeline />
      {!loading && groups && items && (
        <Timeline
          style={{}}
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-4, "days")}
          defaultTimeEnd={moment().add(4, "days")}
        />
      )}
    </div>
  )
}

export default CustomTimeline
