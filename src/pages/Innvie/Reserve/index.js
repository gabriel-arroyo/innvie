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

import { useEffect, useRef, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import { Checkbox } from "@mui/material";
import useCalendar from "api/useCalendar";
import useType from "api/useType";
import MKButton from "components/MKButton";
import CustomPricingCard from "examples/Cards/PricingCards/CustomPricingCard";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import loggedUser from "states/loggedUser";
import BlancLayout from "../Layouts/BlancLayout";

function Reserve() {
  const [user] = useAtom(loggedUser);
  const { startDate, endDate, type } = useParams();
  const { getAvailableRoom } = useCalendar();
  const [room, setRoom] = useState({});
  const [typeData, setTypeData] = useState({});
  const [days, setDays] = useState(1);
  const { getType } = useType();
  console.log(room);

  const getDaysNumber = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  };

  useEffect(() => {
    getAvailableRoom(type, startDate, endDate).then((r) => {
      setRoom(r);
    });
    getType(type).then((r) => {
      setTypeData(r);
    });
    getDaysNumber();
  }, []);
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
    <BlancLayout title="Reservación">
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <CustomPricingCard
              badge={{ color: "light", label: "cotización" }}
              price={{ currency: "$", value: days * typeData.price }}
              specifications={[
                { label: `Habitación ${type}`, singlePrice: `$${typeData.price}` },
                { label: `${days} día${days > 1 ? "s" : ""}` },
                { label: `Entrada:`, singlePrice: startDate },
                { label: `Salida:`, singlePrice: endDate },
                // { label: "Descuento", singlePrice: "50.00", discount: true },
                { label: "Impuestos", singlePrice: `$${0.0425 * typeData.price}` },
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
                      <MKInput
                        type="text"
                        label="Nombre"
                        value={user?.first_name ?? ""}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="text"
                        label="Apellido"
                        value={user?.last_name ?? ""}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Teléfono" value={user?.phone ?? ""} fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="text"
                        label="Dirección"
                        value={user?.address ?? ""}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Ciudad" value={user?.city ?? ""} fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="País" value={user?.country ?? ""} fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="text"
                        label="Código Postal"
                        value={user?.zipcode ?? ""}
                        fullWidth
                      />
                    </MKBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MKBox mb={2}>
                      <MKInput type="email" label="Email" value={user?.email ?? ""} fullWidth />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="text"
                        name="licence"
                        label="Licence Number"
                        value={user?.licence ?? ""}
                        fullWidth
                      />
                    </MKBox>
                    <Grid item>
                      <MKBox mb={2}>
                        <MKInput
                          type="number"
                          name="party"
                          label="Número de ocupantes"
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
                          label="Niños"
                          value={kids}
                          onChange={handleKidsChange}
                        />
                      </MKBox>
                    </Grid>
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
              <MKBox mt={3}>
                <MKButton
                  component="a"
                  href="http://www.google.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="gradient"
                  color="error"
                  fullWidth
                >
                  Pagar
                </MKButton>
              </MKBox>
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </BlancLayout>
  );
}

export default Reserve;
