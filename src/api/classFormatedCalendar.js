import moment from "moment"
/* eslint-disable camelcase */
const { serverTimestamp } = require("firebase/firestore")

class Calendar {
  constructor(id, group, title, start_time, end_time) {
    this.id = id
    this.group = group
    this.title = title
    this.start_time = start_time
    this.end_time = end_time
  }

  toString() {
    return `${this.id}, ${this.group}, ${this.title}`
  }
}

const formatedCalendarConverter = {
  toFirestore: (calendar) => ({
    id: calendar.id,
    startDate: new Date(calendar.startDate),
    endDate: new Date(calendar.endDate),
    lastUpdate: serverTimestamp(),
    number: calendar.group,
    first_name: calendar.title.split(/[ ,]+/)[0],
    last_name: calendar.title.split(/[ ,]+/)[1] ?? "",
  }),
  fromFirestore: (snapShot, options) => {
    const data = snapShot.data(options)
    const name = data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : ""
    const startDate = moment(data.startDate.toDate())
    const endDate = moment(data.endDate.toDate())
    return new Calendar(data.id, data.number, name, startDate, endDate)
  },
}

export default formatedCalendarConverter
