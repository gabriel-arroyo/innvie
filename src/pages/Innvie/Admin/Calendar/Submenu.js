import * as React from "react"
import PropTypes from "prop-types"
import Avatar from "@mui/material/Avatar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
// import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import { Container, Modal } from "@mui/material"
import MKBox from "components/MKBox"
import ReserveModal from "./ReserveModal"
// import { blue } from "@mui/material/colors"

// const emails = ["username3@gmail.com", "user02@gmail.com"]

export default function Submenu(props) {
  const {
    onClose,
    selectedValue,
    open,
    selectedDate,
    selectedGroup,
    selectedRoomNumber,
    tempEndDate,
  } = props
  const [show, setShow] = React.useState(false)
  const toggleModal = () => setShow(!show)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = () => {
    toggleModal()
    // onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Admin</DialogTitle>
      <List sx={{ pt: 0 }}>
        {/* {emails.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))} */}

        <ListItem disableGutters>
          <Container>
            <ListItemButton autoFocus onClick={() => handleListItemClick("addAccount")}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Reserve" />
            </ListItemButton>
            <Modal
              open={show}
              onClose={toggleModal}
              sx={{
                display: "grid",
                placeItems: "center",
                height: "94vh",
                overflowY: "scroll",
                paddingTop: "3vh",
              }}
            >
              <MKBox
                position="relative"
                width="70%"
                display="flex"
                flexDirection="column"
                borderRadius="xl"
                bgColor="white"
                shadow="xl"
              >
                <ReserveModal
                  modal
                  selectedDate={selectedDate}
                  selectedGroup={selectedGroup}
                  selectedRoomNumber={selectedRoomNumber}
                  tempEndDate={tempEndDate}
                />
              </MKBox>
            </Modal>
          </Container>
        </ListItem>
      </List>
    </Dialog>
  )
}

Submenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  selectedGroup: PropTypes.string.isRequired,
  selectedRoomNumber: PropTypes.string.isRequired,
  tempEndDate: PropTypes.string.isRequired,
}

// export default function Submenu() {
//   const [open, setOpen] = React.useState(false)
//   const [selectedValue, setSelectedValue] = React.useState(emails[1])

//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = (value) => {
//     setOpen(false)
//     setSelectedValue(value)
//   }

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   )
// }
