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
  const [show, setShow] = React.useState(false)
  const navigate = useNavigate()

  const returnHome = () => {
    console.log("return")
    setShow(!show)
    navigate("/")
  }

  const toggleModal = () => {
    console.log("toggle")
    setShow(!show)
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
                      <MKButton variant="gradient" color="error" onClick={toggleModal}>
                        Checkin
                      </MKButton>
                      <CheckinLoginModal
                        show={show}
                        toggleModal={toggleModal}
                        returnHome={returnHome}
                      />
                    </>
                  ) : (
                    <>
                      <MKButton variant="gradient" color="primary" onClick={toggleModal}>
                        Checkout
                      </MKButton>
                      <CheckoutLoginModal
                        show={show}
                        toggleModal={toggleModal}
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
