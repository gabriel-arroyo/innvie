/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
import Icon from "@mui/material/Icon"
import CloseIcon from "@mui/icons-material/Close"
import MKTypography from "components/MKTypography"
import moment from "moment"
import { Card, Divider, Modal, Slide } from "@mui/material"
import MKBox from "components/MKBox"
import colors from "assets/theme/base/colors"
import { getDaysDifference } from "tools/getDate"
import MKButton from "components/MKButton"
import useFormatedCalendar from "../../../../api/useFormatedCalendar"
import InfoLabel from "../../../../components/Innvie/InfoLabel"
import CalendarFilters from "../../../../components/Innvie/CalendarFilters"

function Calendar() {
  const { loading, items, groups, getCalendar, updateCalendarEntry, filterItems } =
    useFormatedCalendar()
  const [tooltip, setTooltip] = useState("")
  const lowLimit = moment().startOf("week")
  const highLimit = moment().endOf("week")
  const [startDate, setStartDate] = useState(lowLimit)
  const [endDate, setEndDate] = useState(highLimit)
  const [selectedItem, setSelectedItem] = useState(null)

  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)

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

  const closeAndSave = () => {
    if (selectedItem.type === "move") {
      const group = groups.find((g) => g.id === selectedItem.newGroupOrder + 1)
      if (group) {
        setTooltip(`${group.title} ${group.tip}`)
      }
      const days = getDaysDifference(
        moment(selectedItem.item.start_time).format(),
        moment(selectedItem.item.end_time).format()
      )
      if (
        groupIntersection(
          selectedItem.itemId,
          selectedItem.newGroupOrder + 1,
          moment(selectedItem.dragTime),
          moment(selectedItem.dragTime).add(days, "days")
        )
      ) {
        return
      }

      const start = moment(selectedItem.dragTime).format()
      const end = moment(selectedItem.dragTime).add(days, "days").format()
      const newGroup = selectedItem.newGroupOrder + 1

      updateCalendarEntry(selectedItem.itemId, start, end, newGroup).then(() => {})
    }
    if (selectedItem.type === "resize") {
      updateCalendarEntry(selectedItem.itemId, selectedItem.start, selectedItem.end).then(() => {})
    }
    setShow(false)
  }

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return
    const itemDate = moment(item.start_time)
    const today = moment().format("YYYY-MM-DD")
    const todayTime = moment(`${today} 12:00:00`)
    if (moment(dragTime).isBefore(todayTime) || itemDate.isBefore(todayTime)) {
      return
    }
    setSelectedItem({ itemId, dragTime, newGroupOrder, item, type: "move" })
    setShow(true)
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
      onKeyUp={() => handleTooltip(group)}
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
    const today = moment().format("YYYY-MM-DD")
    const todayTime = moment(`${today} 12:00:00`)
    if (moment(endTimeOrStartTime).isBefore(todayTime)) {
      return
    }
    const date = moment(endTimeOrStartTime)
    if (date.isBefore(moment())) {
      return
    }
    const item = items.find((i) => i.id === itemId)
    if (moment(item.end_time).isBefore(todayTime)) {
      return
    }
    const group = groups.find((g) => g.id === item.group)
    if (group) {
      setTooltip(`${group.title} ${group.tip}`)
    }
    if (item.start_time.isBefore(moment()) && edge === "left") {
      return
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
    setSelectedItem({ itemId, start, end, type: "resize" })
    setShow(true)
  }

  return (
    <MKBox mx={{ lg: 4, sm: 0 }}>
      <Card>
        <CalendarFilters
          filterItems={filterItems}
          groups={groups}
          items={items}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        {!loading && items && groups ? (
          <Timeline
            groups={groups}
            items={items}
            canMove
            canResize="both"
            // defaultTimeStart={moment().add(-2, "day")}
            // defaultTimeEnd={moment().add(2, "day")}
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
            defaultTimeStart={lowLimit}
            defaultTimeEnd={highLimit}
            visibleTimeStart={startDate}
            visibleTimeEnd={endDate}
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
                return (
                  <div
                    style={customStyles}
                    onClick={someCustomHandler}
                    onKeyUp={someCustomHandler}
                  />
                )
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
      <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
        <Slide direction="down" in={show} timeout={500}>
          <MKBox
            position="relative"
            width="500px"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            variant="gradient"
            bgColor="error"
            shadow="sm"
          >
            <MKBox display="flex" alginItems="center" justifyContent="space-between" py={3} px={2}>
              <MKTypography variant="h6" color="white">
                Atención por favor
              </MKTypography>
              <CloseIcon
                color="white"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={toggleModal}
              />
            </MKBox>
            <Divider light sx={{ my: 0 }} />
            <MKBox p={6} textAlign="center" color="white">
              <Icon fontSize="large" color="inherit">
                notifications_active
              </Icon>
              <MKTypography variant="h4" color="white" mt={3} mb={1}>
                Está modificando el estado de una habitación
              </MKTypography>
              <MKTypography variant="body2" color="white" opacity={0.8} mb={2}>
                Esto podría afectar la reservación de algún huesped
              </MKTypography>
            </MKBox>
            <Divider light sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="space-between" py={2} px={1.5}>
              <MKButton color="white" onClick={closeAndSave}>
                OK
              </MKButton>
              <MKButton variant="text" color="white" onClick={toggleModal}>
                close
              </MKButton>
            </MKBox>
          </MKBox>
        </Slide>
      </Modal>
    </MKBox>
  )
}

export default Calendar
