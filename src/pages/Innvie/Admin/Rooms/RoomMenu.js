import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MKBadge from "components/MKBadge"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"
import MKBox from "components/MKBox"
import Slide from "@mui/material/Slide"
import Icon from "@mui/material/Icon"
import CloseIcon from "@mui/icons-material/Close"
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state"
import { PropTypes } from "prop-types"
import { useState } from "react"
import MKTypography from "components/MKTypography"
import MKButton from "components/MKButton"

function RoomState({ state }) {
  const states = {
    available: "success",
    occupied: "warning",
    dirty: "error",
    maintenance: "info",
  }
  return (
    <MKBadge
      component={Button}
      variant="contained"
      badgeContent={state}
      color={states[state]}
      size="xs"
      container
    />
  )
}

RoomState.propTypes = {
  state: PropTypes.string.isRequired,
}

function RoomMenu({ room, updateRoom }) {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const [option, setOption] = useState(room.status)
  const states = {
    available: "success",
    occupied: "error",
    dirty: "warning",
    maintenance: "info",
  }
  const closeAndSave = () => {
    updateRoom({ ...room, status: option }, true)
  }
  const handleAvailable = () => {
    setOption("available")
    toggleModal()
  }
  const handleOcupied = () => {
    setOption("occupied")
    toggleModal()
  }
  const handleDirty = () => {
    setOption("dirty")
    toggleModal()
  }
  const handleMaintenance = () => {
    setOption("maintenance")
    toggleModal()
  }
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <MKBadge
              component={Button}
              badgeContent={room.status}
              color={states[room.status]}
              size="xs"
              container
              variant="contained"
              {...bindTrigger(popupState)}
            />
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault()
                  handleAvailable()
                  popupState.close()
                }}
              >
                Available
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault()
                  handleOcupied()
                  popupState.close()
                }}
              >
                Ocupied
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault()
                  handleDirty()
                  popupState.close()
                }}
              >
                Dirty
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault()
                  handleMaintenance()
                  popupState.close()
                }}
              >
                Maintenance
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>

      <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
        <Slide direction="down" in={show} timeout={500}>
          <MKBox
            position="relative"
            width="500px"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            variant="gradient"
            bgColor="error"
            shadow="sm"
          >
            <MKBox display="flex" alginItems="center" justifyContent="space-between" py={3} px={2}>
              <MKTypography variant="h6" color="white">
                Atención por favor
              </MKTypography>
              <CloseIcon
                color="white"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={toggleModal}
              />
            </MKBox>
            <Divider light sx={{ my: 0 }} />
            <MKBox p={6} textAlign="center" color="white">
              <Icon fontSize="large" color="inherit">
                notifications_active
              </Icon>
              <MKTypography variant="h4" color="white" mt={3} mb={1}>
                Está modificando el estado de una habitación
              </MKTypography>
              <MKTypography variant="body2" color="white" opacity={0.8} mb={2}>
                Esto podría afectar la reservación de algún huesped
              </MKTypography>
            </MKBox>
            <Divider light sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="space-between" py={2} px={1.5}>
              <MKButton color="white" onClick={closeAndSave}>
                OK
              </MKButton>
              <MKButton variant="text" color="white" onClick={toggleModal}>
                close
              </MKButton>
            </MKBox>
          </MKBox>
        </Slide>
      </Modal>
    </>
  )
}

RoomMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired,
  updateRoom: PropTypes.func.isRequired,
}

export default RoomMenu
