/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Authentication layout components
import CoverLayout from "pages/Authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Grid } from "@mui/material";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
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
            Registro
          </MKTypography>
          <MKTypography display="block" variant="button" color="white" my={1}>
            Ingresa tus datos para registrarte
          </MKTypography>
        </MKBox>
        <MKBox p={3}>
          <MKBox component="form" role="form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MKBox mb={2}>
                  <MKInput type="text" label="Nombre" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="text" label="Apellido" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="text" label="Teléfono" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="text" label="Dirección" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="text" label="Ciudad" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="text" label="País" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="text" label="Código Postal" fullWidth />
                </MKBox>
              </Grid>
              <Grid item xs={6}>
                <MKBox mb={2}>
                  <MKInput type="email" label="Email" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="password" label="Contraseña" fullWidth />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="password" label="Repite Contraseña" fullWidth />
                </MKBox>
              </Grid>
            </Grid>
            <MKBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MKTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Acepto los&nbsp;
              </MKTypography>
              <MKTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Términos y condiciones
              </MKTypography>
            </MKBox>
            <MKBox mt={3} mb={1}>
              <MKButton variant="gradient" color="primary" fullWidth>
                Registrarse
              </MKButton>
            </MKBox>
            <MKBox mt={3} mb={1} textAlign="center">
              <MKTypography variant="button" color="text">
                ¿Ya tienes una cuenta?
                <MKTypography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Registrarse
                </MKTypography>
              </MKTypography>
            </MKBox>
          </MKBox>
        </MKBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
