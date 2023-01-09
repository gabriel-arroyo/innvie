import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MKBadge from "components/MKBadge";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { PropTypes } from "prop-types";

function RoomState({ state }) {
  const states = {
    available: "success",
    occupied: "warning",
    dirty: "error",
    maintenance: "info",
  };
  return (
    <MKBadge
      component={Button}
      variant="contained"
      badgeContent={state}
      color={states[state]}
      size="xs"
      container
    />
  );
}

RoomState.propTypes = {
  state: PropTypes.string.isRequired,
};

function RoomMenu({ room, updateRoom }) {
  const states = {
    available: "success",
    occupied: "error",
    dirty: "warning",
    maintenance: "info",
  };
  const handleAvailable = () => {
    updateRoom({ ...room, status: "available" });
  };
  const handleOcupied = () => {
    updateRoom({ ...room, status: "occupied" });
  };
  const handleDirty = () => {
    updateRoom({ ...room, status: "dirty" });
  };
  const handleMaintenance = () => {
    updateRoom({ ...room, status: "maintenance" });
  };
  return (
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
                e.preventDefault();
                handleAvailable();
                popupState.close();
              }}
            >
              Available
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                handleOcupied();
                popupState.close();
              }}
            >
              Ocupied
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                handleDirty();
                popupState.close();
              }}
            >
              Dirty
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                handleMaintenance();
                popupState.close();
              }}
            >
              Maintenance
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}

RoomMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired,
  updateRoom: PropTypes.func.isRequired,
};

export default RoomMenu;
