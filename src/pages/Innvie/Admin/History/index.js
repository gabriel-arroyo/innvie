/* eslint-disable camelcase */
// prop-types is a library for typechecking of props
import PropTypes from "prop-types"

import SelectPicker from "components/Innvie/SelectPicker"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Material Kit 2 PRO React components
import MKBox from "components/MKBox"
// import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography"

import { useAtom } from "jotai"
import historyFilterAtom from "states/historyFilter"
// Material Kit 2 PRO React examples
import useHistory from "api/useHistory"
import Table from "examples/Tables/Table"
import { useEffect, useState } from "react"
import { Card } from "@mui/material"
import useRoom from "api/useRoom"
import useUser from "../../../../api/useUser"

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
  )
}

// Typechecking props for the Author
RoomId.propTypes = {
  name: PropTypes.string.isRequired,
}

function RoomTypeItem({ category, subCategory }) {
  return (
    <MKBox display="flex" flexDirection="column">
      <MKTypography variant="caption" fontWeight="medium" color="text">
        {category}
      </MKTypography>
      <MKTypography variant="caption" color="secondary">
        {subCategory}
      </MKTypography>
    </MKBox>
  )
}

// Typechecking props for the Role
RoomTypeItem.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
}

function History() {
  const { loading, getCompleteHistory } = useHistory()
  const [rows, setRows] = useState()
  const [historyFilter, setHistoryFilter] = useAtom(historyFilterAtom)
  const { getRooms } = useRoom()
  const { getAllUsers } = useUser()
  const [options, setOptions] = useState()

  useEffect(() => {
    const allOptions = []
    let allRows = []
    getRooms().then((r) => {
      r.forEach((room) => {
        allOptions.push(room.number)
      })
    })
    getAllUsers().then((u) => {
      u.forEach((user) => {
        allOptions.push(user.email)
      })
    })
    setOptions(allOptions)
    const getName = ({ first_name, last_name, admin }) => {
      if (first_name && last_name) {
        return `${first_name} ${last_name}`
      }
      if (admin) {
        return "admin"
      }
      return ""
    }
    getCompleteHistory().then((h) => {
      h.forEach((element) => {
        const row = {
          date: element.lastUpdate.toDate().toLocaleDateString(),
          action: element.action,
          id: element.actionId,
          email: element.email,
          name: getName(element),
        }
        allRows.push(row)
      })
      if (historyFilter !== "all") {
        allRows = allRows.filter(
          (r) =>
            r.id === historyFilter || r.id.toString() === historyFilter || r.email === historyFilter
        )
      }
      setRows(allRows)
      console.log("allrows", allRows)
    })
  }, [loading, historyFilter])

  const columns = [
    { name: "date", align: "center" },
    { name: "id", align: "center" },
    { name: "name", align: "center" },
    { name: "email", align: "center" },
    { name: "action", align: "center" },
  ]

  const handleFilterChange = (e) => {
    console.log("🚀 ~ file: index.js:97 ~ handleFilterChange ~ e", e)
    if (e.target.localName === "li") {
      setHistoryFilter(e.target.innerText)
    } else {
      setHistoryFilter("all")
    }
  }

  return (
    <MKBox
      component="section"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        sx={{
          width: "300px",
          p: "10px",
          mb: "20px",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <SelectPicker
          options={options}
          name="type"
          label="Filter"
          onChange={handleFilterChange}
          value={historyFilter}
        />
      </Card>
      <Container>
        <Grid container item xs={12} lg={10} md={8} mx="auto">
          <Table columns={columns} rows={rows} />
        </Grid>
      </Container>
    </MKBox>
  )
}

export default History
