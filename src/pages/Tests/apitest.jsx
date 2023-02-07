import Timeline, { DateHeader, SidebarHeader, TimelineHeaders } from "react-calendar-timeline"
import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"
import MKBox from "components/MKBox"
import { Card } from "@mui/material"
import Calendar from "components/Innvie/Calendar"

const groups = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
  { id: 3, title: "group 3" },
  { id: 4, title: "group 4" },
  { id: 5, title: "group 5" },
  { id: 6, title: "group 6" },
  { id: 7, title: "group 7" },
  { id: 8, title: "group 8" },
  { id: 9, title: "group 9" },
  { id: 10, title: "group 10" },
  { id: 11, title: "group 11" },
  { id: 12, title: "group 12" },
  { id: 13, title: "group 13" },
  { id: 14, title: "group 14" },
  { id: 15, title: "group 15" },
  { id: 16, title: "group 16" },
  { id: 17, title: "group 17" },
  { id: 18, title: "group 18" },
  { id: 19, title: "group 19" },
  { id: 20, title: "group 20" },
  { id: 21, title: "group 21" },
  { id: 22, title: "group 22" },
  { id: 23, title: "group 23" },
  { id: 24, title: "group 24" },
  { id: 25, title: "group 25" },
  { id: 26, title: "group 26" },
  { id: 27, title: "group 27" },
  { id: 28, title: "group 28" },
  { id: 29, title: "group 29" },
  { id: 30, title: "group 30" },
  { id: 31, title: "group 31" },
]

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: moment(),
    end_time: moment().add(1, "hour"),
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: moment().add(-0.5, "hour"),
    end_time: moment().add(0.5, "hour"),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour"),
  },
]

function ApiTest() {
  return (
    <MKBox mx={4}>
      <Card>
        <Timeline
          groups={groups}
          items={items}
          canMove
          canResize="both"
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
          onItemClick={(itemId, _, time) => alert(time, itemId)}
        >
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => (
                <div {...getRootProps()} style={{ color: "white", margin: "15px" }}>
                  Habitaciones
                </div>
              )}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </Card>
      <Calendar />
    </MKBox>
  )
}

export default ApiTest
