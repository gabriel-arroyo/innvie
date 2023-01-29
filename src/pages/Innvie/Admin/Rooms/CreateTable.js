/* eslint-disable react/forbid-prop-types */
import { Button, Container, Grid } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomMenu from "./RoomMenu";

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

function RoomAction({ id }) {
  return (
    <MKTypography
      component={Link}
      to="/admin/newroom"
      variant="caption"
      color="secondary"
      fontWeight="medium"
    >
      {id}
    </MKTypography>
  );
}

RoomAction.propTypes = {
  id: PropTypes.string.isRequired,
};

function RoomHistoryButton({ number, setTab, setHistoryFilter }) {
  const filter = () => {
    setTab(2);
    setHistoryFilter(number);
  };
  return <Button onClick={filter}>History</Button>;
}
RoomHistoryButton.propTypes = {
  number: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
};

// create table react function component receive columns, rooms and types as props
function CreateTable({ rooms, types, loading, updateRoom, setTab, setHistoryFilter }) {
  const [rows, setRows] = useState([]);

  const columns = [
    { name: "ID", align: "left" },
    { name: "Tipo", align: "left" },
    { name: "Habitaciones", align: "center" },
    { name: "Queen", align: "center" },
    { name: "Full", align: "center" },
    { name: "Estado", align: "center" },
    { name: "Entrada", align: "center" },
    { name: "Comentarios", align: "center" },
    { name: "history", align: "center" },
  ];

  const callback = useCallback(() => {
    if (
      !columns ||
      !rooms ||
      !types ||
      columns.length === 0 ||
      rooms.length === 0 ||
      types.length === 0
    )
      return;
    const allrows = rooms.map((element) => {
      const typeForThisRoom = types.find((type) => type.type === element.type);
      const data = { ...element, ...typeForThisRoom };
      return {
        ID: <RoomId name={data.number} />,
        Tipo: <RoomType category={data.type} subCategory={data.category} />,
        Habitaciones: data.rooms,
        Queen: data.beds.queen,
        Full: data.beds.full,
        Estado: <RoomMenu room={data} updateRoom={updateRoom} />,
        Entrada: data.entry,
        Comentarios: data.comment,
        history: (
          <RoomHistoryButton
            number={data.number}
            setTab={setTab}
            setHistoryFilter={setHistoryFilter}
          />
        ),
      };
    });
    setRows(allrows);
  }, [loading, rooms, types]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div>
      {rows ? (
        <Container>
          <Grid container item xs={12} lg={12} mx="auto">
            <Table columns={columns} rows={rows} />
          </Grid>
        </Container>
      ) : (
        <div style={{ color: "white" }}>Loading...</div>
      )}
    </div>
  );
}

CreateTable.propTypes = {
  rooms: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateRoom: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
};

// export create table react function component
export default CreateTable;
