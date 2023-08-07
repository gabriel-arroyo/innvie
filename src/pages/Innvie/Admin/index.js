import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import PropTypes from "prop-types"
import * as React from "react"
import Calendar from "./Calendar/Calendar"
import History from "./History"
import NewRoomType from "./NewRoom"
import Rooms from "./Rooms"
import Offers from "./Offers"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      style={{ minHeight: "calc(100vh - 275px)" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const [tab, setTab] = React.useState(0)

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <Box sx={{ width: "90%", paddingTop: "230px", margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Rooms" {...a11yProps(1)} />
          <Tab label="Calendar" {...a11yProps(2)} />
          <Tab label="Room Types" {...a11yProps(3)} />
          <Tab label="History" {...a11yProps(4)} />
          <Tab label="Offers" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Rooms setTab={setTab} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Calendar />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <NewRoomType />
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <History />
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <Offers />
      </TabPanel>
    </Box>
  )
}
