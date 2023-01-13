// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components

// Material Kit 2 PRO React components
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
// import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import useRoom from "api/useRoom";
import useType from "api/useType";
import { useEffect, useState } from "react";
import CreateTable from "./CreateTable";

// Images

// Components
function RoomId({ name }) {
  return (
    <MKBox display="flex" alignItems="center" px={1} py={0.5}>
      <MKBox display="flex" flexDirection="column">
        <MKTypography variant="button" fontWeight="medium">
          {name}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

// Typechecking props for the Author
RoomId.propTypes = {
  name: PropTypes.string.isRequired,
};

function RoomType({ category, subCategory }) {
  return (
    <MKBox display="flex" flexDirection="column">
      <MKTypography variant="caption" fontWeight="medium" color="text">
        {category}
      </MKTypography>
      <MKTypography variant="caption" color="secondary">
        {subCategory}
      </MKTypography>
    </MKBox>
  );
}

// Typechecking props for the Role
RoomType.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
};

function RoomState({ state }) {
  const states = {
    available: "success",
    occupied: "warning",
    dirty: "error",
    maintenance: "info",
  };
  return (
    <MKBadge variant="contained" badgeContent={state} color={states[state]} size="xs" container />
  );
}

RoomState.propTypes = {
  state: PropTypes.string.isRequired,
};

function Rooms({ setTab, setHistoryFilter }) {
  const { getRooms, loading, updateRoom } = useRoom();
  const { types, loading: loadingtypes } = useType();
  const [rooms, setRooms] = useState();

  // update rooms when loading changes
  useEffect(() => {
    if (!loading) {
      getRooms().then((res) => {
        setRooms(res);
      });
    }
  }, [loading]);

  return (
    <MKBox component="section" pt={0}>
      <CreateTable
        types={types}
        rooms={rooms}
        loading={loading && loadingtypes}
        updateRoom={updateRoom}
        setTab={setTab}
        setHistoryFilter={setHistoryFilter}
      />
    </MKBox>
  );
}

Rooms.propTypes = {
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
};

export default Rooms;
