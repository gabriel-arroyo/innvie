// @mui material components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import image from "assets/images/examples/blog2.jpg";
import DateInput from "../../Home/components/Date/DateInput";

function Room() {
  return (
    <MKBox component="section" py={12}>
      <Container sx={{ mt: "-90px", mb: "150px" }}>
        <DateInput />
      </Container>
      <MKBox bgColor="grey-100" py={12} px={{ xs: 3, lg: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={6} ml="auto">
            <MKTypography variant="h2" mb={1}>
              Modelo 1 / Lote
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={3}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Arcu dui vivamus arcu felis. Morbi
              tincidunt ornare massa eget egestas purus viverra. Fringilla ut morbi tincidunt augue
              interdum. Nulla malesuada pellentesque elit eget gravida. Donec massa sapien faucibus
              et molestie ac feugiat sed. Convallis aenean et tortor at. Eu non diam phasellus
              vestibulum lorem sed risus ultricies tristique. Morbi tristique senectus et netus et.
              Lectus arcu bibendum at varius. Amet cursus sit amet dictum sit amet justo donec. Eu
              volutpat odio facilisis mauris.
            </MKTypography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <MKTypography variant="h3" color="text" mb={3}>
                  $1,234.00
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MKButton variant="gradient" color="primary" sx={{ height: "100%" }}>
                  Reservar
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={4} position="relative">
            <MKBox
              component="img"
              src={image}
              alt="image"
              maxWidth="18.75rem"
              width="100%"
              borderRadius="lg"
              shadow="xl"
              mt={-24}
              display={{ xs: "none", lg: "block" }}
            />
          </Grid>
        </Grid>
      </MKBox>

      <MKTypography variant="body1" color="text" mb={3} mt={3}>
        [Información Adicional]:
      </MKTypography>
      <MKTypography variant="body1" color="text" mb={10}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Arcu dui vivamus arcu felis. Morbi tincidunt ornare massa
        eget egestas purus viverra. Fringilla ut morbi tincidunt augue interdum. Nulla malesuada
        pellentesque elit eget gravida. Donec massa sapien faucibus et molestie ac feugiat sed.
        Convallis aenean et tortor at. Eu non diam phasellus vestibulum lorem sed risus ultricies
        tristique. Morbi tristique senectus et netus et. Lectus arcu bibendum at varius. Amet cursus
        sit amet dictum sit amet justo donec. Eu volutpat odio facilisis mauris.
      </MKTypography>
      <MKTypography
        component="a"
        href="#"
        variant="button"
        fontWeight="bold"
        color="info"
        textGradient
      >
        Política de privacidad
      </MKTypography>
    </MKBox>
  );
}

export default Room;
