/* eslint-disable react/forbid-prop-types */
import { Container, Grid } from "@mui/material"
import useTable from "api/useTable"
import Table from "examples/Tables/Table"
import PropTypes from "prop-types"

// create table react function component receive columns, rooms and types as props
function CreateTable({ rooms, types, loading, updateRoom, setTab, setHistoryFilter }) {
  const { rows, cols } = useTable({ rooms, types, setTab, setHistoryFilter, updateRoom })

  return (
    <div>
      {rows && !loading ? (
        <Container>
          <Grid container item xs={12} lg={12} mx="auto">
            <Table columns={cols} rows={rows} />
          </Grid>
        </Container>
      ) : (
        <div style={{ color: "white" }}>Loading...</div>
      )}
    </div>
  )
}

CreateTable.propTypes = {
  rooms: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateRoom: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
}

// export create table react function component
export default CreateTable
