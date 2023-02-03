const { serverTimestamp } = require("firebase/firestore")

class Calendar {
  constructor(email, startDate, endDate, lastUpdate, number, type, price) {
    this.email = email
    this.startDate = startDate
    this.endDate = endDate
    this.lastUpdate = lastUpdate
    this.number = number
    this.type = type
    this.price = price
  }

  toString() {
    return `${this.number}, ${this.email}, ${this.startDate}`
  }
}

const calendarConverter = {
  toFirestore: (calendar) => ({
    email: calendar.name,
    startDate: new Date(calendar.startDate),
    endDate: new Date(calendar.endDate),
    lastUpdate: serverTimestamp(),
    number: calendar.number,
    type: calendar.type,
    price: calendar.price,
  }),
  fromFirestore: (snapShot, options) => {
    const data = snapShot.data(options)
    return new Calendar(
      data.email,
      data.startDate.toDate(),
      data.endDate.toDate(),
      data.lastUpdate.toDate(),
      data.number,
      data.type,
      data.price
    )
  },
}

export default calendarConverter
