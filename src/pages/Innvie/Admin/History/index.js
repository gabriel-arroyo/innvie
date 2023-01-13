// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
// import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import useHistory from "api/useHistory";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";

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

function History({ historyFilter }) {
  const { loading, getCompleteHistory } = useHistory();
  const [rows, setRows] = useState();

  useEffect(() => {
    const allRows = [];
    getCompleteHistory().then((h) => {
      h.forEach((element) => {
        const row = {
          date: element.lastUpdate.toDate().toLocaleDateString(),
          action: element.action,
          id: element.actionId,
        };
        allRows.push(row);
      });
      setRows(allRows);
      console.log("allrows", allRows);
    });
  }, [loading]);

  const columns = [
    { name: "date", align: "center" },
    { name: "action", align: "center" },
    { name: "id", align: "center" },
  ];

  return (
    <MKBox component="section">
      {historyFilter !== "all" ? (
        <MKBox pb={2}>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <MKTypography color="white" variant="h5" fontWeight="medium">
              {historyFilter}
            </MKTypography>
          </Container>
        </MKBox>
      ) : null}
      <Container>
        <Grid container item xs={12} lg={5} md={8} mx="auto">
          <Table columns={columns} rows={rows} />
        </Grid>
      </Container>
    </MKBox>
  );
}

History.propTypes = {
  historyFilter: PropTypes.string.isRequired,
};

export default History;
