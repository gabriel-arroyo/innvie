import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

import { Grid } from "@mui/material";
import useUser from "api/useUser";
import { useAtom } from "jotai";
import TermsModal from "pages/Innvie/TermsAndConditions/modal";
import loggedUser from "states/loggedUser";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const [error, setError] = useState(null);
  const { addUser, insertError } = useUser();
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [, setLogged] = useState(false);
  const { getCurrentUser } = useUser();
  const [, setUser] = useAtom(loggedUser);

  useEffect(() => {
    if (getCurrentUser()) {
      setLogged(true);
      setUser(getCurrentUser());
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.password.value !== event.target.password_confirmation.value) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const newUser = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
      city: event.target.city.value,
      country: event.target.country.value,
      zipcode: event.target.zipcode.value,
      email: event.target.email.value,
      password: event.target.password.value,
      id: uuidv4(),
      licence: event.target.licence.value,
    };
    Promise.resolve(addUser(newUser)).then((res) => {
      if (res) {
        event.target.reset();
        setChecked(false);
      }
    });
  };
  return (
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
        <MKBox component="form" role="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={6}>
              <MKBox mb={2}>
                <MKInput type="text" name="first_name" label="Nombre" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="last_name" label="Apellido" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="phone" label="Teléfono" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="address" label="Dirección" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="city" label="Ciudad" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="country" label="País" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="zipcode" label="Código Postal" fullWidth />
              </MKBox>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <MKBox mb={2}>
                <MKInput type="email" name="email" label="Email" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" name="licence" label="Licence Number" fullWidth />
              </MKBox>
              {insertError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: "-5px",
                    marginBottom: "5px",
                  }}
                >
                  El usuario ya existe
                </p>
              )}
              <MKBox mb={2}>
                <MKInput type="password" name="password" label="Contraseña" fullWidth />
              </MKBox>
              <MKBox mb={2}>
                <MKInput
                  type="password"
                  name="password_confirmation"
                  label="Repite Contraseña"
                  fullWidth
                />
              </MKBox>
              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: "-5px",
                    marginBottom: "5px",
                  }}
                >
                  {error}
                </p>
              )}
            </Grid>
          </Grid>
          <MKBox display="flex" alignItems="center" ml={-1}>
            <Checkbox checked={checked} onChange={handleChange} />
            <MKTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Acepto los&nbsp;
            </MKTypography>
            <TermsModal />
          </MKBox>
          <MKBox mt={3} mb={1}>
            <MKButton type="submit" variant="gradient" color="error" fullWidth disabled={!checked}>
              Registrarse
            </MKButton>
          </MKBox>
          <MKBox mt={3} mb={1} textAlign="center">
            <MKTypography variant="button" color="text">
              ¿Ya tienes una cuenta?{" "}
              <MKTypography
                component={Link}
                to="/authentication"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Ingresa
              </MKTypography>
            </MKTypography>
          </MKBox>
        </MKBox>
      </MKBox>
    </Card>
  );
}

export default Register;
