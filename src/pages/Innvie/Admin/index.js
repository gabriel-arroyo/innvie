import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rooms from "./Rooms";
import History from "./History";
import NewRoomType from "./NewRoom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ minHeight: "calc(100vh - 275px)" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "90%", paddingTop: "230px", margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Habitaciones" {...a11yProps(0)} />
          <Tab label="Tipos de habitación" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Rooms setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewRoomType
          room={{
            name: "Single3",
            type: "Departamento",
            beds: { queen: 2, full: 1 },
            price: 230,
            accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge"],
            photos: [
              "https://firebasestorage.googleapis.com/v0/b/innvie-6e09a.appspot.com/o/rooms%2F5091cd34-5873-4163-8acc-ad4e258544c0?alt=media&token=0d1f011c-1ddb-4a1f-bcc0-a90466147be0",
            ],
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History />
      </TabPanel>
    </Box>
  );
}
