/*
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function Description() {
  return (
    <Card
      sx={{
        p: 0,
        mx: { xs: 2, lg: 3 },
        mt: 8,
        mb: 4,
        backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
    >
      <MKBox component="section">
        <Container>
          <Grid container item xs={12} justifyContent="center" mx="auto">
            <Grid container justifyContent="center" py={6}>
              <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
                <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <MKTypography variant="h3">Bienvenido</MKTypography>
                </MKBox>
                <MKTypography variant="body1" fontWeight="light" color="text">
                  En INNVIE nos interesa tu descanso y tranquilidad. Si viajas solo, acompañado o en
                  grupo, tenemos espacios para que así sea.
                  <br />
                  INNVIE te ofrece un ambiente espacioso y tranquilo fuera de la ciudad, pero muy
                  cerca y totalmente conectado, para que disfrutes la cercanía con la ciudad. <br />
                </MKTypography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </Card>
  );
}

export default Description;
