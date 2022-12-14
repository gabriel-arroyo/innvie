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

import React, { useEffect, useRef, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";

// Otis Kit PRO examples
import CustomPricingCard from "examples/Cards/PricingCards/CustomPricingCard";
import { Checkbox } from "@mui/material";
import BlancLayout from "../Layouts/BlancLayout";

function Reserve() {
  const [party, setParty] = useState(0);
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });
  const handlePartyChange = (e) => {
    const intParty = parseInt(e.target.value, 10);
    if (intParty < 0) return;
    const intKids = parseInt(kids, 10);
    const intAdults = parseInt(adults, 10);
    const up = intParty > intKids + intAdults;
    if (up || !(intAdults === 1 && intKids > 0)) {
      const newAdults = intParty - intKids;
      setAdults(newAdults);
    } else {
      const newKids = intParty - intAdults;
      setKids(newKids);
    }
    setParty(intParty > 0 ? intParty : 0);
  };
  const handleAdultsChange = (e) => {
    const intAdults = parseInt(e.target.value, 10);
    const intParty = parseInt(party, 10);
    const newKids = intParty - intAdults;
    if (newKids < 0) return;
    if (intAdults < 0) return;
    setKids(newKids);
    setAdults(intAdults);
  };
  const handleKidsChange = (e) => {
    const intKids = parseInt(e.target.value, 10);
    const intParty = parseInt(party, 10);
    const newAdults = intParty - intKids;
    if (newAdults < 0) return;
    if (intKids < 0) return;
    setKids(intKids);
    setAdults(newAdults);
  };

  return (
    <BlancLayout title="Reservaci??n">
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <CustomPricingCard
              badge={{ color: "light", label: "cotizaci??n" }}
              price={{ currency: "$", value: 119 }}
              specifications={[
                { label: "Habitaci??n modelo 1", singlePrice: "1,234.00" },
                { label: "2 d??as" },
                { label: "Entrada: 11/11/11" },
                { label: "Salida: 22/22/22" },
                { label: "Descuento", singlePrice: "50.00", discount: true },
                { label: "Impuestos", singlePrice: "23.00" },
              ]}
              action={{
                type: "internal",
                route: "/innvie/confirmation",
                color: "error",
                label: "Pagar",
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <MKBox p={3} bgColor="white" shadow="sm" borderRadius={10}>
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
                      <MKInput type="text" label="Tel??fono" fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Direcci??n" fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Ciudad" fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Pa??s" fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="C??digo Postal" fullWidth />
                    </MKBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MKBox mb={2}>
                      <MKInput type="email" label="Email" fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" name="licence" label="Licence Number" fullWidth />
                    </MKBox>
                    <Grid item>
                      <MKBox mb={2}>
                        <MKInput
                          type="number"
                          name="party"
                          label="N??mero de ocupantes"
                          value={party}
                          onChange={handlePartyChange}
                        />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput
                          type="number"
                          name="adults"
                          label="Adultos"
                          value={adults}
                          onChange={handleAdultsChange}
                        />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput
                          type="number"
                          name="children"
                          label="Ni??os"
                          value={kids}
                          onChange={handleKidsChange}
                        />
                      </MKBox>
                    </Grid>
                    <MKBox mb={2}>
                      <MKInput type="password" label="Contrase??a" fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="password" label="Repite Contrase??a" fullWidth />
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
                    T??rminos y condiciones
                  </MKTypography>
                </MKBox>
              </MKBox>
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </BlancLayout>
  );
}

export default Reserve;
