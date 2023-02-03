import moment from "moment/moment"

export const getCurrentDate = (date = new Date()) => {
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return currentDate
}
export const getTomorrowDate = (date = new Date()) => {
  date.setDate(date.getDate() + 1)
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return currentDate
}

export const getShortDate = (_date) => {
  const date = new Date(_date)
  const usDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  return usDate
}

export const getDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const difference = Math.abs(end - start)
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24))
  if (Number.isNaN(days)) return 0
  return days
}
export const getReservationsDaysDifference = (startDate, endDate) => {
  try {
    const startMoment = moment(startDate)
    const endMoment = moment(endDate)
    return endMoment.diff(startMoment, "days")
  } catch {
    return 0
  }
}

export function getStatus(startDate, endDate) {
  const today = new Date()
  if (startDate > today) {
    return "Pending"
  }
  if (startDate <= today && endDate >= today) {
    return "Open"
  }
  return "Done"
}

export function dateIsPast(date) {
  try {
    const today = moment()
    const m = moment(date)
    return m.isBefore(today)
  } catch {
    return false
  }
}

export function parseDate(date) {
  if (!date) return ""
  let str = ""
  try {
    const m = moment(date)
    str = m.toISOString().substring(0, 10)
  } catch (error) {
    console.log("fecha ilegible", date)
  }
  return str
}

export function removeDateRange(sdBig, edBig, sdSmall, edSmall) {
  if (!sdBig || !edBig || !sdSmall || !edSmall) return []
  const startDateA = moment(sdBig)
  const endDateA = moment(edBig)
  const startDateB = moment(sdSmall)
  const endDateB = moment(edSmall)

  const dateRanges = []

  if (startDateB.isBefore(startDateA)) {
    if (endDateB.isBefore(startDateA)) {
      dateRanges.push({ start: startDateA, end: endDateA })
    } else if (endDateB.isBefore(endDateA)) {
      dateRanges.push({ start: startDateA, end: endDateB.clone().subtract(1, "days") })
      dateRanges.push({ start: endDateB.clone().add(1, "days"), end: endDateA })
    } else {
      dateRanges.push({ start: startDateA, end: startDateB.clone().subtract(1, "days") })
    }
  } else if (startDateB.isBefore(endDateA)) {
    if (endDateB.isBefore(endDateA)) {
      dateRanges.push({ start: startDateB.clone().add(1, "days"), end: endDateA })
    } else {
      dateRanges.push({ start: startDateB.clone().add(1, "days"), end: endDateA })
    }
  } else {
    dateRanges.push({ start: startDateA, end: endDateA })
  }
  if (!dateRanges || dateRanges.length < 1) return []
  const { start, end } = dateRanges[0]
  const rstart = start.add(1, "days").format("YYYY-MM-DD")
  const rend = end.format("YYYY-MM-DD")
  return { startDate: rstart, endDate: rend }
}

export function isBefore(date1, date2) {
  const dateA = moment(date1)
  const dateB = moment(date2)
  return dateA.isBefore(dateB)
}
