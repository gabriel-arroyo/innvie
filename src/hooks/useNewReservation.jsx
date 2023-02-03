import taxes from "constants/taxes"
import { useReducer, useState } from "react"
import { getDaysDifference } from "tools/getDate"

function newReservationReducer(state, action) {
  switch (action.type) {
    case "update_startDate": {
      const daysDifferente = getDaysDifference(action.payload, state.newReservation.endDate)
      console.log(
        "🚀 ~ file: useNewReservation.jsx:10 ~ newReservationReducer ~ daysDifferente",
        daysDifferente
      )
      return {
        ...state,
        newReservation: {
          ...state.newReservation,
          startDate: action.payload,
          days: daysDifferente,
          cost: daysDifferente * state.newReservation.price * taxes,
        },
      }
    }
    case "update_endDate": {
      const daysDifferente = getDaysDifference(state.newReservation.startDate, action.payload)
      return {
        ...state,
        newReservation: {
          ...state.newReservation,
          endDate: action.payload,
          days: daysDifferente,
          cost: daysDifferente * state.newReservation.price * taxes,
        },
      }
    }
    default: {
      return state
    }
  }
}

function useNewReservation(event) {
  const [price] = useState(20)
  const days = getDaysDifference(event.startDate, event.endDate)
  const initialState = {
    prevReservation: {
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      days,
      price,
      cost: days * price * taxes + days * price,
    },
    newReservation: {
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      days,
      price,
      cost: days * price * taxes + days * price,
    },
  }
  const [state, dispatch] = useReducer(newReservationReducer, initialState)
  return [state, dispatch, price]
}

export default useNewReservation
