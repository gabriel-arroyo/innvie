// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
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
      { name: "ID", align: "left" },
      { name: "Tipo", align: "left" },
      { name: "Categoría", align: "left" },
      { name: "Habitaciones", align: "center" },
      { name: "Camas", align: "center" },
      { name: "Estado", align: "center" },
      { name: "Entrada", align: "center" },
      { name: "action", align: "center" },
    ],

    rows: [
      {
        ID: <RoomId name="105" />,
        Tipo: <RoomType category="Departamento" />,
        Habitaciones: "1",
        Estado: (
          <MKBadge
            variant="contained"
            badgeContent="disponible"
            color="success"
            size="xs"
            container
          />
        ),
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/18
          </MKTypography>
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
      {
        ID: <RoomId name="101" />,
        Tipo: <RoomType category="Departamento" />,
        Habitaciones: "3",
        Estado: (
          <MKBadge
            variant="contained"
            badgeContent="disponible"
            color="success"
            size="xs"
            container
          />
        ),
        Entrada: (
          <MKTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/18
          </MKTypography>
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
      {
        ID: <RoomId name="108" />,
        Tipo: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Habitación
          </MKTypography>
        ),
        Camas: "1",
        Categoría: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Sencilla
          </MKTypography>
        ),
        Estado: (
          <MKBadge variant="contained" badgeContent="ocupada" color="error" size="xs" container />
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
      {
        ID: <RoomId name="102" />,
        Tipo: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Habitación
          </MKTypography>
        ),
        Camas: "2",
        Categoría: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Sencilla
          </MKTypography>
        ),
        Estado: (
          <MKBadge variant="contained" badgeContent="ocupada" color="error" size="xs" container />
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
      {
        ID: <RoomId name="109" />,
        Tipo: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Habitación
          </MKTypography>
        ),
        Camas: "1",
        Categoría: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Sencilla con cocineta
          </MKTypography>
        ),
        Estado: (
          <MKBadge
            variant="contained"
            badgeContent="limpieza"
            color="warning"
            size="xs"
            container
          />
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
      {
        ID: <RoomId name="103" />,
        Tipo: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Habitación
          </MKTypography>
        ),
        Camas: "2",
        Categoría: (
          <MKTypography variant="caption" fontWeight="medium" color="text">
            Sencilla con cocineta
          </MKTypography>
        ),
        Estado: (
          <MKBadge
            variant="contained"
            badgeContent="limpieza"
            color="warning"
            size="xs"
            container
          />
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
      {
        ID: <RoomId name="201" />,
        Tipo: <RoomType category="Habitación" subCategory="Studio" />,
        Estado: (
          <MKBadge
            variant="contained"
            badgeContent="Mantenimiento"
            color="info"
            size="xs"
            container
          />
        ),
        action: (
          <MKTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </MKTypography>
        ),
      },
    ],
  };

  return (
    <MKBox component="section" pt={20}>
      <MKBox pb={2}>
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MKButton color="error" component={Link} to="/admin/newroom">
            Nueva habitación
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
