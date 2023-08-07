/* eslint-disable react/prop-types */
import React from "react"
import List from "@mui/material/List"

export default function OffersList({ children }) {
  return <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>{children}</List>
}
