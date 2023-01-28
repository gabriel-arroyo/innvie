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

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import { Checkbox } from "@mui/material";
import useUser from "api/useUser";
import useCalendar from "api/useCalendar";
import CustomPricingCard from "examples/Cards/PricingCards/CustomPricingCard";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { reservedDays, reservedEndDate, reservedStartDate } from "states/reservedDate";
import selectedPrice from "states/selectedPrice";
import selectedType from "states/selectedType";
import BlancLayout from "../Layouts/BlancLayout";
import LoginModal from "../Authentication/Login/LoginModal";

function Reserve() {
  const [startDate] = useAtom(reservedStartDate);
  const [endDate] = useAtom(reservedEndDate);
  const [days] = useAtom(reservedDays);
  const [type] = useAtom(selectedType);
  const [price] = useAtom(selectedPrice);
  const navigate = useNavigate();
  const { room, addReservation } = useCalendar({ type, startDate, endDate });
  const [terms, setTerms] = useState(false);
  const impuestos = 0.0425;
  const { currentUser: user, logged, getAndUpdateUser, checkEmail, mailExists } = useUser();
  const [formName, setFormName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formZipCode, setFormZipCode] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formLicense, setFormLicense] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirPassword, setFormConfirPassword] = useState("");
  const [coincidentPassword, setCoincidentPassword] = useState(true);

  const handleCheck = () => {
    setTerms(!terms);
  };

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

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    console.log(`Transaction ${details.status} by ${details.payer.name.given_name}`);
    console.log("selected room", room?.number ?? "ND");
    const newUser = {
      first_name: formName ?? "",
      last_name: formLastName ?? "",
      phone: formPhone ?? "",
      address: formAddress ?? "",
      city: formCity ?? "",
      country: formCountry ?? "",
      zipcode: formZipCode ?? "",
      email: formEmail ?? "",
      license: formLicense ?? "",
    };
    await getAndUpdateUser(newUser);
    const code = await addReservation(formEmail, room, startDate, endDate);
    setTimeout(() => {
      navigate(`/confirmation/${code}`);
    }, 1000);
  };

  const onNameChange = (e) => {
    setFormName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setFormLastName(e.target.value);
  };

  const onPhoneChange = (e) => {
    setFormPhone(e.target.value);
  };

  const onAddressChange = (e) => {
    setFormAddress(e.target.value);
  };

  const onCityChange = (e) => {
    setFormCity(e.target.value);
  };

  const onCountryChange = (e) => {
    setFormCountry(e.target.value);
  };

  const onZipCodeChange = (e) => {
    setFormZipCode(e.target.value);
  };

  let countdown;
  const onEmailChange = async (e) => {
    setFormEmail(e.target.value);
    clearTimeout(countdown);
    countdown = setTimeout(() => {
      console.log("email changed");
      checkEmail(e.target.value);
    }, 3000);
  };

  const onLiceseChange = (e) => {
    setFormLicense(e.target.value);
  };

  const onPasswordChange = (e) => {
    setFormPassword(e.target.value);
    setCoincidentPassword(formConfirPassword === e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setFormConfirPassword(e.target.value);
    setCoincidentPassword(formPassword === e.target.value);
  };

  useEffect(() => {
    if (!user) return;
    setFormName(user.first_name);
    setFormLastName(user.last_name);
    setFormPhone(user.phone);
    setFormAddress(user.address);
    setFormCity(user.city);
    setFormCountry(user.country);
    setFormZipCode(user.zipcode);
    setFormEmail(user.email);
    setFormLicense(user.license);
  }, [user]);

  return (
    <BlancLayout title="Reservación">
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <CustomPricingCard
              badge={{ color: "light", label: "cotización" }}
              price={{ currency: "$", value: days * price }}
              specifications={[
                { label: `Habitación ${type}`, singlePrice: `$${price}` },
                { label: `${days} día${days > 1 ? "s" : ""}` },
                { label: `Entrada:`, singlePrice: startDate },
                { label: `Salida:`, singlePrice: endDate },
                // { label: "Descuento", singlePrice: "50.00", discount: true },
                {
                  label: "Impuestos",
                  singlePrice: `${days} x $${impuestos * price}`,
                },
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
              {!logged && <LoginModal />}
              <MKBox component="form" role="form">
                <Grid item xs={12}>
                  <MKBox mb={2}>
                    <MKInput
                      onChange={onNameChange}
                      value={formName}
                      type="text"
                      label="Nombre"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Apellido"
                      value={formLastName}
                      onChange={onLastNameChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Teléfono"
                      value={formPhone}
                      onChange={onPhoneChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Dirección"
                      value={formAddress}
                      onChange={onAddressChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Ciudad"
                      value={formCity}
                      onChange={onCityChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="País"
                      value={formCountry}
                      onChange={onCountryChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Código Postal"
                      value={formZipCode}
                      onChange={onZipCodeChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      value={formEmail}
                      onChange={onEmailChange}
                      fullWidth
                    />
                  </MKBox>
                  {mailExists && (
                    <MKTypography
                      fontWeight="regular"
                      fontSize={12}
                      color="error"
                      textAlign="center"
                    >
                      Este correo ya está registrado. Ingrese con su cuenta
                    </MKTypography>
                  )}
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      name="license"
                      label="License Number"
                      value={formLicense}
                      onChange={onLiceseChange}
                      fullWidth
                    />
                  </MKBox>
                </Grid>
                <Grid item xs={12} py={4}>
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
                </Grid>
                {!logged && (
                  <Grid item xs={12}>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        label="Contraseña"
                        value={formPassword}
                        onChange={onPasswordChange}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        label="Repite Contraseña"
                        value={formConfirPassword}
                        onChange={onConfirmPasswordChange}
                        fullWidth
                      />
                    </MKBox>
                    {!coincidentPassword && (
                      <MKTypography
                        fontWeight="regular"
                        fontSize={12}
                        color="error"
                        textAlign="center"
                      >
                        Las contraseñas no coinciden
                      </MKTypography>
                    )}
                  </Grid>
                )}
                <MKBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox onChange={handleCheck} />
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
              {!terms || mailExists || !coincidentPassword || !formEmail || party < 1 ? (
                <MKTypography fontWeight="regular" color="error" sx={{ textAlign: "center" }}>
                  Por favor llene todos los campos correctamente
                </MKTypography>
              ) : (
                <MKBox mt={3}>
                  <PayButton
                    price={price * days * impuestos + price * days}
                    onApprove={onApprove}
                  />
                </MKBox>
              )}
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </BlancLayout>
  );
}

export default Reserve;

// pay button arrow function component
function PayButton({ price, onApprove }) {
  const stringPrice = parseFloat(price.toString()).toFixed(2);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AV6fcal5XwIGN4OXUc9cZ3GmOTLfp4JYhpGH39hP92nxNjQlMvsXmHib_jpGlOK7pkGInHd0oEutDvD0",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: stringPrice } }],
          })
        }
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}

PayButton.propTypes = {
  price: PropTypes.number.isRequired,
  onApprove: PropTypes.func.isRequired,
};
