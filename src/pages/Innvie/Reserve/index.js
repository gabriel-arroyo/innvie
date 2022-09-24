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
import Grid from "@mui/material/Grid";

import BaseLayout from "layouts/sections/components/BaseLayout";
// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";

// Otis Kit PRO examples
import CustomPricingCard from "examples/Cards/PricingCards/CustomPricingCard";
import { Checkbox } from "@mui/material";

function Reserve() {
  return (
    <BaseLayout
      title="Reservación"
      breadcrumb={[
        { label: "Modelos", route: "/pages/landing-pages/rental" },
        { label: "Reservar" },
      ]}
    >
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <CustomPricingCard
              badge={{ color: "light", label: "cotización" }}
              price={{ currency: "$", value: 119 }}
              specifications={[
                { label: "Habitación modelo 1", singlePrice: "1,234.00" },
                { label: "2 días" },
                { label: "Entrada: 11/11/11" },
                { label: "Salida: 22/22/22" },
                { label: "Descuento", singlePrice: "50.00", discount: true },
                { label: "Impuestos", singlePrice: "23.00" },
              ]}
              action={{
                type: "internal",
                route: "/",
                color: "primary",
                label: "Pagar",
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
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
              </MKBox>
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </BaseLayout>
  );
}

export default Reserve;
