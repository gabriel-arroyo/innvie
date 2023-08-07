/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect, useState } from "react"
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKButton from "components/MKButton"
import { Grid } from "@mui/material"
import useCalendar from "api/useCalendar"
// import { reservedEndDate, reservedStartDate } from "states/reservedDate"
// import selectedPrice from "states/selectedPrice"
// import { selectedType, maxOccupantsInType } from "states/selectedType"

function RemoveModal({ selectedDate, selectedItem, selectedGroup, onClose }) {
  const { cancelReservation } = useCalendar("Single", new Date(), new Date())
  const [type, setType] = useState(null)
  const [formatDate, setFormatDate] = useState("")
  const [id, setId] = useState("")
  const onApprove = () => {
    console.log("approved", id)
    cancelReservation(id)
    onClose()
  }

  useEffect(() => {
    const itemObj = JSON.parse(selectedItem)
    setType(selectedGroup)
    setFormatDate(selectedDate.split("T")[0])
    setId(itemObj.itemId)
  }, [])

  return (
    <Card>
      <MKBox
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Remove {type} reservation on {formatDate}
        </MKTypography>
        <MKTypography display="block" variant="button" color="white" my={1}>
          Confirm you want to remove this reservation
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3} component="form" role="form">
        <MKBox>
          <Grid item xs={12} lg={4}>
            <MKBox p={3} bgColor="white" shadow="sm" borderRadius={10}>
              <MKButton
                variant="contained"
                color="error"
                size="large"
                onClick={onApprove}
                fullWidth
              >
                Remove
              </MKButton>
            </MKBox>
          </Grid>
        </MKBox>
      </MKBox>
    </Card>
  )
}

export default RemoveModal
