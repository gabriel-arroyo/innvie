/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react"
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TodayMarker,
  CursorMarker,
} from "react-calendar-timeline"
import "react-calendar-timeline/lib/Timeline.css"
import "./Calendar.css"
import moment from "moment"
import { Card } from "@mui/material"
import MKBox from "components/MKBox"
import colors from "assets/theme/base/colors"
import { getDaysDifference } from "tools/getDate"
import useFormatedCalendar from "../../../../api/useFormatedCalendar"
import InfoLabel from "../../../../components/Innvie/InfoLabel"
import CalendarFilters from "../../../../components/Innvie/CalendarFilters"

function Calendar() {
  const { loading, items, groups, getCalendar, updateCalendarEntry, filterItems } =
    useFormatedCalendar()
  const [tooltip, setTooltip] = useState("")

  const itemIntersects = (item, start, end) => {
    const itemStart = moment(item.start_time)
    const itemEnd = moment(item.end_time)
    const newStart = moment(start)
    const newEnd = moment(end)
    const condition1 = itemStart.isSameOrAfter(newStart) && itemStart.isSameOrBefore(newEnd)
    const condition2 = itemEnd.isSameOrAfter(newStart) && itemEnd.isSameOrBefore(newEnd)
    const overlap =
      itemStart.isBetween(newStart, newEnd) ||
      itemEnd.isBetween(newStart, newEnd) ||
      (newStart.isSameOrAfter(itemStart) && newEnd.isSameOrBefore(itemEnd))
    return condition1 || condition2 || overlap
  }
  const groupIntersection = (itemId, group, start, end) => {
    const itemsOnNewGroup = items.filter((i) => i.group === group && i.id !== itemId)
    return itemsOnNewGroup.filter((i) => itemIntersects(i, start, end)).length > 0
  }

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return
    const group = groups.find((g) => g.id === newGroupOrder + 1)
    if (group) {
      setTooltip(`${group.title} ${group.tip}`)
    }
    const days = getDaysDifference(moment(item.start_time).format(), moment(item.end_time).format())
    if (
      groupIntersection(
        itemId,
        newGroupOrder + 1,
        moment(dragTime),
        moment(dragTime).add(days, "days")
      )
    ) {
      return
    }

    const start = moment(dragTime).format()
    const end = moment(dragTime).add(days, "days").format()
    const newGroup = newGroupOrder + 1

    updateCalendarEntry(itemId, start, end, newGroup).then(() => {})
  }
  function handleTooltip(group) {
    setTooltip(`${group.title} ${group.tip}`)
  }
  function someCustomHandler() {
    alert("test")
  }
  useEffect(() => {
    getCalendar()
  }, [])
  const getBackgroundColor = (status, selected, end_time) => {
    // if end_time has passed, set color to grey
    if (moment(end_time).isBefore(moment())) {
      return "gray"
    }
    if (selected) {
      return "rgb(13,40,60)"
    }
    switch (status) {
      case "available":
        return colors.success.main
      case "occupied":
        return colors.error.main
      case "maintenance":
        return colors.error.info
      case "dirty":
        return colors.warning.main
      default:
        return "rgb(13,40,60)"
    }
  }
  const getItemRealTimeStatus = (item) => {
    if (moment(item.end_time).isBefore(moment())) {
      return "Done"
    }
    return item.status
  }
  const capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const itemRenderer = ({ item, itemContext, getItemProps }) => (
    <div
      {...getItemProps({
        style: {
          background: getBackgroundColor(item.status, itemContext.selected, item.end_time),
        },
      })}
      className="custom-item"
    >
      <div>{`${itemContext.title} - ${capitalize(getItemRealTimeStatus(item))}`}</div>
    </div>
  )
  const groupRenderer = ({ group }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="custom-group"
      onMouseEnter={() => handleTooltip(group)}
      onClick={() => handleTooltip(group)}
    >
      {group.title}
    </div>
  )
  const onItemClick = (e) => {
    console.log("🚀 ~ file: Calendar.js:32 ~ onItemClick ~ e", e)
    // find item by item id
    const item = items.find((i) => i.id === e)
    if (!item) return
    // find group by item id
    const group = groups.find((g) => g.id === item.group)
    if (!group) return
    setTooltip(`${group.title} ${group.tip}`)
  }
  const handleItemDrag = (e) => {
    const group = groups.find((g) => g.id === e.newGroupOrder + 1)
    if (group) {
      setTooltip(`${group.title} ${group.tip}`)
    }
  }
  const handleItemResize = (itemId, endTimeOrStartTime, edge) => {
    const date = moment(endTimeOrStartTime)
    const item = items.find((i) => i.id === itemId)
    const group = groups.find((g) => g.id === item.group)
    if (group) {
      setTooltip(`${group.title} ${group.tip}`)
    }
    if (
      groupIntersection(
        itemId,
        item.group,
        edge === "left" ? date : item.start_time,
        edge === "left" ? item.end_time : date
      )
    ) {
      console.log("intersecting items")
      return
    }

    const start = edge === "left" ? date : item.start_time
    const end = edge === "left" ? item.end_time : date

    updateCalendarEntry(itemId, start, end).then(() => {})
  }
  return (
    <MKBox mx={{ lg: 4, sm: 0 }}>
      <Card>
        <CalendarFilters filterItems={filterItems} groups={groups} items={items} />
        {!loading && items && groups ? (
          <Timeline
            groups={groups}
            items={items}
            canMove
            canResize="both"
            defaultTimeStart={moment().add(-2, "day")}
            defaultTimeEnd={moment().add(2, "day")}
            onItemClick={onItemClick}
            onItemSelect={onItemClick}
            sidebarWidth={50}
            minZoom={60 * 60 * 1000 * 24 * 4}
            timeSteps={{ day: 1 }}
            groupRenderer={groupRenderer}
            itemRenderer={itemRenderer}
            horizontalLineClassNamesForGroup={(group) => (group.root ? ["row-root"] : [])}
            onItemMove={handleItemMove}
            onItemDrag={handleItemDrag}
            onItemResize={handleItemResize}
          >
            <InfoLabel tooltip={tooltip} />
            <TodayMarker />
            <TodayMarker>
              {/* custom renderer for this marker */}
              {({ styles }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: "deeppink",
                  width: "4px",
                }
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                return <div style={customStyles} onClick={someCustomHandler} />
              }}
            </TodayMarker>
            <CursorMarker />
            <TimelineHeaders className="sticky">
              <SidebarHeader>
                {({ getRootProps }) => (
                  <div {...getRootProps()} style={{ color: "white", margin: "1px", width: "45px" }}>
                    Hab
                  </div>
                )}
              </SidebarHeader>
              <DateHeader unit="primaryHeader" />
              <DateHeader />
            </TimelineHeaders>
          </Timeline>
        ) : (
          <Card
            sx={{
              height: "100vh",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ width: "100%", alignSelf: "center", textAlign: "center" }}>Loading...</p>
          </Card>
        )}
      </Card>
    </MKBox>
  )
}

export default Calendar
