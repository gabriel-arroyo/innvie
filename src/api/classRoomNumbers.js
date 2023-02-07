/* eslint-disable camelcase */
const { serverTimestamp } = require("firebase/firestore")

class RoomNumber {
  constructor(id, title) {
    this.id = id
    this.rightTitle = title
    this.title = id
  }

  toString() {
    return `${this.id}, ${this.title}`
  }
}

const roomNumberConverter = {
  toFirestore: (calendar) => ({
    number: calendar.id,
    type: calendar.type,
    lastUpdate: serverTimestamp(),
  }),
  fromFirestore: (snapShot, options) => {
    const data = snapShot.data(options)
    return new RoomNumber(data.number, data.type)
  },
}

export default roomNumberConverter
