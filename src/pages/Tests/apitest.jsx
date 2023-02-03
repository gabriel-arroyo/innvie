// import { v4 as uuidv4 } from "uuid";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css"
import { useEffect } from "react"
import "./apitest.css"
import useFormatedCalendar from "api/useFormatedCalendar"
import Timeline from "react-calendar-timeline"
import moment from "moment/moment"

const grupos = [
  {
    id: 1,
    title: "1-Single",
  },
  {
    id: 2,
    title: "2-Single",
  },
  {
    id: 3,
    title: "3-Single",
  },
  {
    id: 4,
    title: "4-Single",
  },
  {
    id: 5,
    title: "5-Single",
  },
  {
    id: 6,
    title: "6-Single",
  },
  {
    id: 7,
    title: "7-Single",
  },
  {
    id: 8,
    title: "8-Single",
  },
  {
    id: 9,
    title: "9-Single",
  },
  {
    id: 10,
    title: "10-Single",
  },
  {
    id: 11,
    title: "11-Single",
  },
  {
    id: 12,
    title: "12-Double",
  },
  {
    id: 13,
    title: "13-Double",
  },
  {
    id: 14,
    title: "14-Double",
  },
  {
    id: 15,
    title: "15-Double",
  },
  {
    id: 16,
    title: "16-Studio",
  },
  {
    id: 17,
    title: "17-Department 2 rooms",
  },
  {
    id: 18,
    title: "18-Department 3 rooms",
  },
  {
    id: 19,
    title: "19-Single Kitchen aid",
  },
  {
    id: 20,
    title: "20-Single Kitchen aid",
  },
  {
    id: 21,
    title: "21-Single Kitchen aid",
  },
  {
    id: 22,
    title: "22-Single Kitchen aid",
  },
  {
    id: 23,
    title: "23-Single Kitchen aid",
  },
]

const elementos = [
  {
    id: "KgfMjw4VxKATEn67tgRc",
    group: 1,
    title: "Gabriel Arroyo",
    start_time: "2023-01-31T20:45:00.000Z",
    end_time: "2023-02-01T17:30:00.470Z",
  },
  {
    id: "MoOTHYbP1G9WnYef0cPm",
    group: 17,
    title: "",
    start_time: "2023-02-02T20:45:00.000Z",
    end_time: "2023-02-03T17:30:00.000Z",
  },
  {
    id: "bg52sm7VvcGHTHCiHCt5",
    group: 16,
    title: "Gabriel Arroyo",
    start_time: "2023-02-15T20:45:00.000Z",
    end_time: "2023-02-18T17:30:00.000Z",
  },
]

function ApiTest() {
  const { groups, items, getCalendar } = useFormatedCalendar()
  useEffect(() => {
    getCalendar()
    console.log(grupos, groups)
    console.log(items)
  }, [])
  return (
    <div style={{ background: "white" }}>
      {groups && items && (
        <Timeline
          groups={grupos}
          items={elementos}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
        />
      )}
    </div>
  )
}

export default ApiTest
