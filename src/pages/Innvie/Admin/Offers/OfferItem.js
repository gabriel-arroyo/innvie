/* eslint-disable react/prop-types */
import React from "react"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { deleteOffer } from "api/offersApi"

export default function OfferItem({
  image = "https://cdn.vectorstock.com/i/1000x1000/88/47/discount-tags-flat-icon-vector-17128847.webp",
  trashImage = "https://cdn-icons-png.flaticon.com/512/1214/1214594.png",
  title = "Title",
  text = "Text",
  offer = "$0.0",
  id,
  onDelete,
}) {
  const handleDelete = async () => {
    await deleteOffer(id)
    onDelete() // Call the onDelete function passed from the parent component
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={image} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {text}
              </Typography>
              <br />
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {offer}
              </Typography>
            </>
          }
        />
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={trashImage} onClick={handleDelete} />
        </ListItemAvatar>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
