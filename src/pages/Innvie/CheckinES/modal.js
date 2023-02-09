/* eslint-disable react/prop-types */
import { Divider, Icon } from "@mui/material"
import MKBox from "../../../components/MKBox/index"
import MKTypography from "../../../components/MKTypography/index"
import MKAlertCloseIcon from "../../../components/MKAlert/MKAlertCloseIcon"
import MKButton from "../../../components/MKButton/index"

const { Modal, Slide } = require("@mui/material")

function CheckinModal({ show, toggleModal }) {
  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="500px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          variant="gradient"
          bgColor="error"
          shadow="sm"
        >
          <MKBox display="flex" alginItems="center" justifyContent="space-between" py={3} px={2}>
            <MKTypography variant="h6" color="white">
              Gracias por su visita
            </MKTypography>
            <MKAlertCloseIcon
              color="white"
              fontSize="medium"
              sx={{ cursor: "pointer" }}
              onClick={toggleModal}
            />
          </MKBox>
          <Divider light sx={{ my: 0 }} />
          <MKBox p={6} textAlign="center" color="white">
            <Icon fontSize="large" color="inherit">
              luggage
            </Icon>
            <MKTypography variant="h4" color="white" mt={3} mb={1}>
              Esperamos que su estancia haya sido agradable.
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8} mb={2}>
              Que tenga un buen viaje. Esperamos verlo pronto.
            </MKTypography>
          </MKBox>
          <Divider light sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" py={2} px={1.5}>
            <MKButton color="white" onClick={toggleModal}>
              OK
            </MKButton>
            <MKButton variant="text" color="white" onClick={toggleModal}>
              Cerrar
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  )
}

export default CheckinModal
