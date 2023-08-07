import { Card, Container } from "@mui/material"
import SectionTitle from "components/SectionTitle"
import React, { useEffect, useState } from "react"
import { readOffers, deleteOffer, createOffer } from "api/offersApi"
import MKBox from "components/MKBox"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import OffersList from "./OffersList"
import OfferItem from "./OfferItem"

export default function Offers() {
  const [list, setList] = useState([])
  const [newOffer, setNewOffer] = useState({ title: "", text: "", subtitle: "" })
  const isFormValid = newOffer.title && newOffer.text && newOffer.subtitle

  const fetchOffers = async () => {
    const offers = await readOffers()
    setList(offers || [])
  }

  useEffect(() => {
    fetchOffers()
  }, [])

  const handleDeleteOffer = async (offerId) => {
    await deleteOffer(offerId)
    fetchOffers()
  }

  const handleNewOfferChange = (event) => {
    const { name, value } = event.target
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }))
  }

  const handleNewOfferSubmit = async (event) => {
    event.preventDefault()
    if (!isFormValid) {
      alert("Please fill in all fields before adding an offer.")
      return
    }
    // Send the new offer data to the server and update the list
    // You need to implement the function to create an offer in your API
    await createOffer(newOffer) // Replace 'createOffer' with the actual API call
    fetchOffers() // Refresh the offers list
    setNewOffer({ title: "", text: "", subtitle: "" }) // Reset the form
  }

  return (
    <Card sx={{ width: "auto", maxWidth: "700px", margin: "auto", marginTop: "30px" }}>
      <SectionTitle title="Crea o elimina ofertas" />
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", paddingBottom: "10px" }}
      >
        <Container sx={{ paddingRight: "40px" }}>
          <form onSubmit={handleNewOfferSubmit}>
            <MKBox mb={2}>
              <MKInput
                type="text"
                name="title"
                label="Title"
                fullWidth
                value={newOffer.title}
                onChange={handleNewOfferChange}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="text"
                name="text"
                label="Text"
                fullWidth
                value={newOffer.text}
                onChange={handleNewOfferChange}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="text"
                name="subtitle"
                label="Subtitle"
                fullWidth
                value={newOffer.subtitle}
                onChange={handleNewOfferChange}
              />
            </MKBox>
            <MKButton
              type="submit"
              disabled={!isFormValid}
              variant="gradient"
              color="primary"
              fullWidth
            >
              Add Offer
            </MKButton>
          </form>
        </Container>
        {list.length > 0 && ( // Only render OffersList if there's data available
          <OffersList>
            {list.map((offer) => (
              <OfferItem
                key={offer.id}
                title={offer.title}
                text={offer.text}
                offer={offer.subtitle}
                id={offer.id}
                onDelete={() => handleDeleteOffer(offer.id)}
              />
            ))}
          </OffersList>
        )}
      </Container>
    </Card>
  )
}
