import React from "react";

// @mui material components
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

function NewRoom() {
  return (
    <MKBox component="section" pt={20}>
      <MKBox pb={2}>
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MKButton color="error" component={Link} to="/admin">
            Habitaciones
          </MKButton>
        </Container>
      </MKBox>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "700px" }}>
          <MKBox
            variant="gradient"
            bgColor="primary"
            borderRadius="lg"
            coloredShadow="primary"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Nueva Habitación
            </MKTypography>
            <MKTypography display="block" variant="button" color="white" my={1}>
              Ingresa los datos para registrar la habitación en el sistema.
            </MKTypography>
          </MKBox>
          <MKBox p={3}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MKBox mb={2}>
                    <MKInput type="text" label="ID" fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Tipo" fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Categoría" fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Habitaciones" fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Camas" fullWidth />
                  </MKBox>
                </Grid>
                <Grid item xs={6}>
                  <MKBox mb={2}>
                    <MKButton variant="gradient" color="error" fullWidth>
                      Fotos
                    </MKButton>
                  </MKBox>
                  <MKBox
                    component="img"
                    src="https://picsum.photos/200/300"
                    alt="..."
                    borderRadius="lg"
                    shadow="md"
                    width="100%"
                    position="relative"
                    zIndex={1}
                  />
                </Grid>
              </Grid>
              <MKBox mt={3} mb={1}>
                <MKButton variant="gradient" color="error" fullWidth>
                  Guardar
                </MKButton>
              </MKBox>
            </MKBox>
          </MKBox>
        </Card>
      </Container>
    </MKBox>
  );
}

export default NewRoom;
