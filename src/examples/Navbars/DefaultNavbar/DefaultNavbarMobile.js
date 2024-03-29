/* eslint-disable no-param-reassign */
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

import { useEffect, useState } from "react"

// react-router components
import { Link } from "react-router-dom"

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types"

// @mui material components
import Collapse from "@mui/material/Collapse"
import MuiLink from "@mui/material/Link"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"

// Otis Kit PRO examples
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown"
import { routes, mobileLoggedRoutes } from "innvie.routes"
import { useAtom } from "jotai"
import loggedUser from "states/loggedUser"
import useNotifications from "api/useNotifications"
import { Grid } from "@mui/material"
import moment from "moment"

function DefaultNavbarMobile({ open }) {
  const [collapse, setCollapse] = useState("")
  const [user] = useAtom(loggedUser)
  const { notifications, getAllNotifications, getNotificationsByEmail } = useNotifications()

  useEffect(() => {
    if (user?.admin) {
      getAllNotifications()
    } else if (user) {
      getNotificationsByEmail(user.email)
    }
  }, [])

  const handleSetCollapse = (name) => (collapse === name ? setCollapse(false) : setCollapse(name))
  const renderNavbarItems = routes.map(({ name, icon, collapse: navCollapse, href, route }) => (
    <DefaultNavbarDropdown
      key={name}
      name={name ?? ""}
      icon={icon}
      collapseStatus={name === collapse}
      onClick={() => handleSetCollapse(name)}
      href={href}
      route={route}
      collapse={Boolean(navCollapse)}
    >
      {navCollapse && (
        <MKBox sx={{ height: "auto", maxHeight: "15rem", overflowY: "scroll" }}>
          {navCollapse?.map((item) => (
            <MKBox key={item.name} px={2}>
              {item.collapse ? (
                <>
                  <MKTypography display="block" variant="button" fontWeight="bold" py={1} px={0.5}>
                    {item.name}
                  </MKTypography>
                  {item.collapse.map((el) => (
                    <MKTypography
                      key={el.name}
                      component={el.route ? Link : MuiLink}
                      to={el.route ? el.route : ""}
                      href={el.href ? el.href : ""}
                      target={el.href ? "_blank" : ""}
                      rel={el.href ? "noreferrer" : "noreferrer"}
                      minWidth="11.25rem"
                      display="block"
                      variant="button"
                      color="text"
                      fontWeight="regular"
                      py={0.625}
                      px={2}
                      sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                        borderRadius: borderRadius.md,
                        cursor: "pointer",
                        transition: "all 300ms linear",

                        "&:hover": {
                          backgroundColor: grey[200],
                          color: dark.main,
                        },
                      })}
                    >
                      {el.name}
                    </MKTypography>
                  ))}
                </>
              ) : (
                <MKBox
                  key={item.key}
                  display="block"
                  component={item.route ? Link : MuiLink}
                  to={item.route ? item.route : ""}
                  href={item.href ? item.href : ""}
                  target={item.href ? "_blank" : ""}
                  rel={item.href ? "noreferrer" : "noreferrer"}
                  sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.md,
                    cursor: "pointer",
                    transition: "all 300ms linear",
                    py: 1,
                    px: 1.625,

                    "&:hover": {
                      backgroundColor: grey[200],
                      color: dark.main,

                      "& *": {
                        color: dark.main,
                      },
                    },
                  })}
                >
                  <MKTypography display="block" variant="button" fontWeight="bold">
                    {item.name}
                  </MKTypography>
                  <MKTypography
                    display="block"
                    variant="button"
                    color="text"
                    fontWeight="regular"
                    sx={{ transition: "all 300ms linear" }}
                  >
                    {item.description}
                  </MKTypography>
                </MKBox>
              )}
            </MKBox>
          ))}
        </MKBox>
      )}
    </DefaultNavbarDropdown>
  ))

  const renderLoggedNavbarItems = mobileLoggedRoutes.map(
    ({ name, icon, collapse: routeCollapses, href, route, collapse: navCollapse }) => {
      if (name === "Notifications") {
        routeCollapses = notifications.map((item) => ({
          name: (
            <Grid container spacing={1} flexDirection="column">
              {user?.admin && (
                <Grid item>
                  <b>{item.email}</b>
                  {" | "}
                  {moment(item.timestamp.toDate()).format("YYYY-MM-DD HH:mm:ss")}
                </Grid>
              )}
              <Grid item>{item.text}</Grid>
            </Grid>
          ),
        }))
      }
      return (
        <DefaultNavbarDropdown
          key={name}
          name={name ?? ""}
          icon={icon}
          collapseStatus={name === collapse}
          onClick={() => handleSetCollapse(name)}
          href={href}
          route={route}
          collapse={Boolean(navCollapse)}
        >
          {navCollapse && (
            <MKBox sx={{ height: "auto", maxHeight: "15rem", overflowY: "scroll" }}>
              {routeCollapses?.map((item) => (
                <MKBox key={item.name} px={2}>
                  {item.collapse ? (
                    <>
                      <MKTypography
                        display="block"
                        variant="button"
                        fontWeight="bold"
                        py={1}
                        px={0.5}
                      >
                        {item.name}
                      </MKTypography>
                      {item.collapse.map((el) => (
                        <MKTypography
                          key={el.name}
                          component={el.route ? Link : MuiLink}
                          to={el.route ? el.route : ""}
                          href={el.href ? el.href : ""}
                          target={el.href ? "_blank" : ""}
                          rel={el.href ? "noreferrer" : "noreferrer"}
                          minWidth="11.25rem"
                          display="block"
                          variant="button"
                          color="text"
                          fontWeight="regular"
                          py={0.625}
                          px={2}
                          sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                            borderRadius: borderRadius.md,
                            cursor: "pointer",
                            transition: "all 300ms linear",

                            "&:hover": {
                              backgroundColor: grey[200],
                              color: dark.main,
                            },
                          })}
                        >
                          {el.name}
                        </MKTypography>
                      ))}
                    </>
                  ) : (
                    <MKBox
                      key={item.key}
                      display="block"
                      component={item.route ? Link : MuiLink}
                      to={item.route ? item.route : ""}
                      href={item.href ? item.href : ""}
                      target={item.href ? "_blank" : ""}
                      rel={item.href ? "noreferrer" : "noreferrer"}
                      sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                        borderRadius: borderRadius.md,
                        cursor: "pointer",
                        transition: "all 300ms linear",
                        py: 1,
                        px: 1.625,

                        "&:hover": {
                          backgroundColor: grey[200],
                          color: dark.main,

                          "& *": {
                            color: dark.main,
                          },
                        },
                      })}
                    >
                      <MKTypography display="block" variant="button" fontWeight="bold">
                        {item.name}
                      </MKTypography>
                      <MKTypography
                        display="block"
                        variant="button"
                        color="text"
                        fontWeight="regular"
                        sx={{ transition: "all 300ms linear" }}
                      >
                        {item.description}
                      </MKTypography>
                    </MKBox>
                  )}
                </MKBox>
              ))}
            </MKBox>
          )}
        </DefaultNavbarDropdown>
      )
    }
  )

  return (
    <Collapse in={Boolean(open)} timeout="auto" unmountOnExit>
      <MKBox width="calc(100% + 1.625rem)" my={2} ml={-2}>
        {!user ? renderNavbarItems : renderLoggedNavbarItems}
      </MKBox>
    </Collapse>
  )
}

// Typechecking props for the DefaultNavbarMobile
DefaultNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Object)]).isRequired,
}

export default DefaultNavbarMobile
