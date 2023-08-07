/* eslint-disable react/prop-types */
import { Card, Container } from "@mui/material"
import { readOffers, createOffer, deleteOffer } from "api/offersApi"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import { useEffect, useState } from "react"
import "react-calendar-timeline/lib/Timeline.css"

function OfferList({ offers }) {
  return (
    <div className="offer-list">
      {offers.map((offer) => (
        <div key={offer.id} className="card">
          <h2>{offer.title}</h2>
          <p>{offer.id}</p>
          <p>{offer.text}</p>
          <p>{offer.subtitle}</p>
        </div>
      ))}
    </div>
  )
}

function ApiTest() {
  const [list, setList] = useState([])
  const [deleteId, setDeleteId] = useState("")
  useEffect(() => {
    readOffers().then((o) => setList(o))
  }, [])

  const handleClick = async () => {
    const offer = {
      title: "2x11234123",
      text: "best offer12341234",
      subtitle: "half price1324123",
    }

    await createOffer(offer)
  }
  const handleDelete = () => {
    deleteOffer(deleteId)
    setDeleteId("") // Clear the textbox after deleting
  }
  return (
    <Card>
      <Container mt={2} pt={3} sx={{ width: "100%", margin: "30px" }}>
        <MKButton variant="contained" color="primary" sx={{ width: "100%" }} onClick={handleClick}>
          Add
        </MKButton>
        <div className="delete-form">
          <input
            type="text"
            placeholder="Enter ID to delete"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <MKButton variant="contained" color="primary" sx={{ width: "100%" }} onClick={handleClick}>
          Delete
        </MKButton>
        <MKTypography
          variant="h6"
          sx={{
            mt: 2,
          }}
        >
          <OfferList offers={list} />
        </MKTypography>
      </Container>
    </Card>
  )
}

export default ApiTest
