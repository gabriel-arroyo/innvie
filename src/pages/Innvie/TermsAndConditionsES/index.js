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
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import TermsModal from "./modal"

// Otis Kit PRO examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
// import routes from "routes";
// import footerRoutes from "footer.routes";

function Terms() {
  return (
    <>
      <MKBox component="section" pt={35} pb={12}>
        <TermsModal />
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                  coloredShadow="dark"
                  p={3}
                  mt={-3}
                  mx={2}
                >
                  <MKTypography variant="h3" color="white">
                    Términos y condiciones
                  </MKTypography>
                </MKBox>
                <MKBox pb={6} px={6}>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Ocupación en el Motel Innvie
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    El número de adultos debe incluir a todos los ocupantes mayores de 21 años.
                    Todos los huéspedes que se registren deben tener 21 años y presentar un
                    documento de identidad con fotografía en el momento del registro de entrada. Los
                    niños menores de 17 años pueden alojarse gratis en la misma habitación que un
                    familiar adulto. La ocupación puede estar restringida por las ordenanzas
                    locales. Por lo general, una o dos personas pueden ocupar una habitación con una
                    cama. No más de cuatro personas pueden ocupar una habitación con dos camas.
                    Fechas de entrada y salida Puede reservar hasta con un año de antelación, en
                    función de la disponibilidad. El número máximo de días que puede reservar en
                    línea es de 28. Todos los huéspedes que se registren deben ser mayores de 18
                    años (en algunos lugares se exige entre 19 y 21 años) y deben presentar un
                    documento de identidad con fotografía en el momento del registro de entrada. Se
                    requiere el pago del alojamiento en el momento del registro con una tarjeta de
                    crédito aceptada o en efectivo. Para pagos con tarjeta de crédito de terceros,
                    póngase en contacto con el establecimiento.
                  </MKTypography>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Tiempos de ingreso y salida
                  </MKTypography>
                  <MKTypography variant="h6" mt={6} mb={3}>
                    Hora de ingreso
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    A cualquier hora según disponibilidad (puede variar según la ubicación y en
                    fechas de eventos especiales y/o fines de semana). Las habitaciones suelen estar
                    disponibles después de las 15.00 horas. Los huéspedes deberán ponerse en
                    contacto con el establecimiento el día de su llegada para conocer los horarios
                    específicos.
                  </MKTypography>
                  <MKTypography variant="h6" mt={6} mb={3}>
                    Hora de salida
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    12 del mediodía (el tiempo varía según la ubicación). Los registros tardíos
                    deben ser aprobados y coordinados con el personal de la recepción antes de la
                    hora de salida.
                  </MKTypography>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Solicitud de servicio de limpieza
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    El costo semanal incluye un servicio de limpieza a la semana.
                  </MKTypography>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      {/* <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox> */}
    </>
  )
}

export default Terms
