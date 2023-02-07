/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { Card, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import React, { useState } from "react"

function CalendarFilters({ filterItems, groups, items }) {
  console.log("🚀 ~ file: CalendarFilters.js:8 ~ CalendarFilters ~ items", items)
  const gropusIds = groups.map(({ id }) => {
    const label = `Room: ${id}`
    const group = {
      label,
      id,
      value: id,
    }
    return group
  })
  const itesmNames = items.map(({ title, email }) => {
    console.log("🚀 ~ file: CalendarFilters.js:29 ~ itesmNames ~ title", title)
    let first_name = ""
    let last_name = ""
    if (title) {
      const names = title.split(" ")
      first_name = names[0]
      last_name = names[1]
    }

    const label = `${first_name} ${last_name} ${email}`
    const item = {
      label,
      id: email,
      value: email,
    }
    return item
  })
  const union = [...gropusIds, ...itesmNames]
  const options = [...new Set(union.map((item) => JSON.stringify(item)))].map((item) =>
    JSON.parse(item)
  )

  console.log("🚀 ~ file: CalendarFilters.js:39 ~ CalendarFilters ~ options", options)
  const [all, setAll] = useState(true)
  const [available, setAvailable] = useState(false)
  const [occupied, setOccupied] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [maintenance, setMaintenance] = useState(false)
  const [done, setDone] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [status, setStatus] = useState([])
  const [room, setRoom] = useState(null)
  const [email, setEmail] = useState(null)

  const handleAllChange = (event) => {
    if (!event.target.checked) return
    setAll(event.target.checked)
    setAvailable(false)
    setOccupied(false)
    setDirty(false)
    setMaintenance(false)
    setDone(false)
    setFilterText("")
    setStatus([])
    if (event.target.checked) filterItems([], room, email)
  }

  const changeSelection = (event, _status) => {
    const set = new Set([...status])
    if (!event.target.checked) {
      set.delete(_status)
      setStatus(set)
      if (set.size === 0) {
        setAll(true)
        filterItems([], room, email)
      } else {
        filterItems(set, room, email)
      }
    } else {
      set.add(_status)
      setStatus(set)
      setAll(false)
      filterItems(set, room, email)
    }
  }
  const addText = (text) => {
    // check if text is number
    if (!text) {
      setRoom(null)
      setEmail(null)
      filterItems(status, null, null)
    } else if (typeof text === "number") {
      setRoom(text)
      setEmail(null)
      filterItems(status, text, null)
    } else if (typeof text === "string") {
      setEmail(text)
      setRoom(null)
      filterItems(status, null, text)
    }
    setAll(false)
  }

  const handleDoneChange = (event) => {
    setDone(event.target.checked)
    changeSelection(event, "done")
  }
  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked)
    changeSelection(event, "available")
  }
  const handleOccupiedChange = (event) => {
    setOccupied(event.target.checked)
    changeSelection(event, "occupied")
  }
  const handleDirtyChange = (event) => {
    setDirty(event.target.checked)
    changeSelection(event, "dirty")
  }
  const handleMaintenanceChange = (event) => {
    setMaintenance(event.target.checked)
    changeSelection(event, "maintenance")
  }

  const handleFilterChange = (newValue) => {
    console.log("🚀 ~ file: CalendarFilters.js:70 ~ handleFilterChange ~ newValue", newValue)
    if (!newValue) {
      setFilterText("")
      setAll(true)
      addText(null)
      return
    }
    if (newValue.id) setFilterText(newValue.id)
    addText(newValue.id)
  }

  return (
    <Card
      sx={{
        p: "10px",
        display: "flex",
        flexDirection: { lg: "row", sm: "column" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Autocomplete
        onChange={(e, newValue) => handleFilterChange(newValue)}
        disablePortal
        inputValue={filterText}
        id="combo-box-demo"
        options={Array.from(options)}
        sx={{ width: { lg: 300, md: 200, sm: 100 }, zIndex: 3000, marginRight: "50px" }}
        renderInput={(params) => <TextField {...params} label="Filter" />}
      />
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={<Checkbox defaultChecked onChange={handleAllChange} checked={all} />}
          label="All"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleAvailableChange} checked={available} />}
          label="Available"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleOccupiedChange} checked={occupied} />}
          label="Occupied"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDirtyChange} checked={dirty} />}
          label="Dirty"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleMaintenanceChange} checked={maintenance} />}
          label="Maintenance"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDoneChange} checked={done} />}
          label="Done"
        />
      </FormGroup>
    </Card>
  )
}
export default CalendarFilters