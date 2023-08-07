/* eslint-disable react/prop-types */
import * as React from "react"
import { useNavigate } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { parseInformalDate } from "tools/getDate"
import { Container } from "@mui/material"
import MKButton from "components/MKButton"
import CheckinLoginModal from "./checkinLoginModal"
import CheckoutLoginModal from "./checkoutLoginModal"

export default function CheckinTable({ rows }) {
  const [showCheckin, setShowCheckin] = React.useState(false)
  const [showCheckout, setShowCheckout] = React.useState(false)
  const navigate = useNavigate()

  const returnHome = () => {
    console.log("return")
    setShowCheckin(!showCheckin)
    setShowCheckout(!showCheckout)
    navigate("/")
  }

  const toggleModalCheckin = () => {
    console.log("toggle")
    setShowCheckin(!showCheckin)
    // navigate("/")
  }

  const toggleModalCheckout = () => {
    console.log("toggle")
    setShowCheckout(!showCheckout)
    // navigate("/")
  }
  console.log(rows)
  return (
    <Container>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="td" scope="row">
                  {row.type}
                </TableCell>
                <TableCell>{`${parseInformalDate(row.startDate)} - ${parseInformalDate(
                  row.endDate
                )}`}</TableCell>
                <TableCell align="center">
                  {row.checkin == null ? (
                    <>
                      <MKButton variant="gradient" color="error" onClick={toggleModalCheckin}>
                        Checkin
                      </MKButton>
                      <CheckinLoginModal
                        show={showCheckin}
                        toggleModal={toggleModalCheckin}
                        returnHome={returnHome}
                      />
                    </>
                  ) : (
                    <>
                      <MKButton variant="gradient" color="primary" onClick={toggleModalCheckout}>
                        Checkout
                      </MKButton>
                      <CheckoutLoginModal
                        show={showCheckout}
                        toggleModal={toggleModalCheckout}
                        returnHome={returnHome}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
