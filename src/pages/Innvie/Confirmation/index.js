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

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import { useAtom } from "jotai";
import loggedUser from "states/loggedUser";
import { reservedDays, reservedEndDate, reservedStartDate } from "states/reservedDate";
import selectedPrice from "states/selectedPrice";
import selectedType from "states/selectedType";
import CustomLayout from "../../../layouts/sections/components/CustomLayout";
import PlacesGrid from "../Home/sections/PlacesGrid";

function Confirmation() {
  const [user] = useAtom(loggedUser);
  const [startDate] = useAtom(reservedStartDate);
  const [endDate] = useAtom(reservedEndDate);
  const [days] = useAtom(reservedDays);
  const [type] = useAtom(selectedType);
  const [price] = useAtom(selectedPrice);
  return (
    <CustomLayout
      title="Confirmación de reservación"
      subtitle="Gracias por su pago. Su pago se ha completado y le hemos enviado un recibo de su compra por correo electrónico. Para ver los detalles de la transacción, inicie sesión en su cuenta PayPal."
    >
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }} mt={8}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <MKBox>
              <MKTypography variant="h6" fontWeight="bold" mb={2}>
                {`${user.first_name} ${user.last_name}`}
              </MKTypography>
              <MKTypography variant="h4">{`Habitación ${type}`}</MKTypography>
              <br />
              <MKTypography>{`Fecha de ingreso: ${startDate}`}</MKTypography>
              <MKTypography>{`Fecha de salida: ${endDate}`}</MKTypography>
              <MKTypography>{`${days} noches`}</MKTypography>
              <MKBox pt={3} pb={2} px={2} textAlign="center">
                <MKBox my={1}>
                  <MKTypography variant="h1" color="text">
                    <MKTypography
                      display="inline"
                      component="small"
                      variant="h5"
                      color="inherit"
                      verticalAlign="top"
                    >
                      $
                    </MKTypography>
                    {price}
                  </MKTypography>
                </MKBox>
              </MKBox>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4} display="flex" flexDirection="column" alignItems="center">
            <MKTypography variant="h6" fontWeight="bold" mb={2}>
              {user.email}
            </MKTypography>
            <MKTypography>Código de reservación</MKTypography>
            <MKTypography variant="h3">A5AD5F4ASNH</MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <MKBox
              component="img"
              src="https://thumbs.dreamstime.com/z/square-map-river-streets-parks-vector-54040512.jpg"
              alt="test"
              borderRadius="lg"
              shadow="md"
              width="85%"
              position="relative"
              zIndex={1}
            />
          </Grid>
          <Grid item xs={12} lg={4} display="flex" flexDirection="column" justifyContent="center">
            <MKTypography sx={{ lineHeight: "2.5" }}>Calle #1234, Ciudad, Estado</MKTypography>

            <MKTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              color="info"
              textGradient
            >
              https://goo.gl/maps/Kttg1XnZgsSEyZH28
            </MKTypography>
          </Grid>
        </Grid>
        <PlacesGrid />
      </MKBox>
    </CustomLayout>
  );
}

export default Confirmation;
