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
import Table from "examples/Tables/Table";
import MKButton from "components/MKButton";
import { Link } from "react-router-dom";

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

function Rooms() {
  const { columns, rows } = {
    columns: [
      { name: "Entrada", align: "center" },
      { name: "Salida", align: "center" },
      { name: "Comentarios", align: "center" },
    ],

    rows: [
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/25
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/26
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/23
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/24
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/21
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/22
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/19
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/20
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/17
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/18
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/15
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/16
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/13
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/14
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/11
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/12
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/09
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/10
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/07
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/08
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/05
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/06
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/03
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/04
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
      {
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/1
          </MKTypography>
        ),
        Salida: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/2
          </MKTypography>
        ),
        Comentarios: "habitación dañada",
      },
    ],
  };

  return (
    <MKBox component="section" pt={20}>
      <MKBox pb={2}>
        <Container sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
          <MKTypography color="white" variant="h3" fontWeight="medium">
            Historial
          </MKTypography>
          <MKTypography color="white" variant="h5" fontWeight="medium">
            Habitación 101
          </MKTypography>
          <MKButton color="error" component={Link} to="/admin">
            Habitaciones
          </MKButton>
        </Container>
      </MKBox>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Table columns={columns} rows={rows} />
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Rooms;
