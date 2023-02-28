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
import Container from "@mui/material/Container"
import Grow from "@mui/material/Grow"
import Icon from "@mui/material/Icon"
import MuiLink from "@mui/material/Link"
import Popper from "@mui/material/Popper"
// import Badge from "@mui/material/Badge"
// import NotificationIcon from "@mui/icons-material/Notifications"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"

// Otis Kit PRO examples
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown"
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile"

// Otis Kit PRO base styles
import breakpoints from "assets/theme/base/breakpoints"

import useUser from "api/useUser"
import { useAtom } from "jotai"
import Login from "pages/Innvie/Authentication/Login"
import loggedUser from "states/loggedUser"
import "./Navbar.css"
import { routes, adminRoutes } from "innvie.routes"
import StandardRoute from "./StandardRout"

function DefaultNavbar({ transparent, light, action, sticky, relative, center, logoUrl }) {
  const [dropdown, setDropdown] = useState("")
  const [dropdownEl, setDropdownEl] = useState("")
  const [dropdownName, setDropdownName] = useState("")
  const [nestedDropdown, setNestedDropdown] = useState("")
  const [nestedDropdownEl, setNestedDropdownEl] = useState("")
  const [nestedDropdownName, setNestedDropdownName] = useState("")
  const [arrowRef, setArrowRef] = useState(null)
  const [mobileNavbar, setMobileNavbar] = useState(false)
  const [mobileView, setMobileView] = useState(false)

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar)

  const { getCurrentUser } = useUser()
  const [user, setUser] = useAtom(loggedUser)
  useEffect(() => {
    if (getCurrentUser()) {
      setUser(getCurrentUser())
    }
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true)
        setMobileNavbar(false)
      } else {
        setMobileView(false)
        setMobileNavbar(false)
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar)

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar)
  }, [])

  const useUserName = (name = "") =>
    name === "Ingresar" || name === "Login" ? user?.first_name ?? "No user" : name
  const renderNavbarItems = (!user ? routes : adminRoutes).map(
    ({ name, icon, href, route, collapse }) => (
      <DefaultNavbarDropdown
        key={name}
        name={useUserName(name) === "No user" ? "" : useUserName(name)}
        icon={icon}
        href={href}
        route={route}
        collapse={Boolean(collapse)}
        onMouseEnter={({ currentTarget }) => {
          if (collapse) {
            setDropdown(currentTarget)
            setDropdownEl(currentTarget)
            setDropdownName(name)
          }
        }}
        onMouseLeave={() => collapse && setDropdown(null)}
        light={light}
      />
    )
  )

  // Render the routes on the dropdown menu
  const renderRoutes = routes.map(({ name, collapse }) => {
    let template
    if (collapse && name === dropdownName) {
      template = collapse.map((item) => (
        <StandardRoute
          collapse={item}
          setNestedDropdown={setNestedDropdown}
          setNestedDropdownEl={setNestedDropdownEl}
          setNestedDropdownName={setNestedDropdownName}
        />
      ))
    }

    return template
  })

  const renderLoggedRoutes = routes.map(({ name, collapse }) => {
    let template
    if (name === "Ingresar" || name === "Login") {
      collapse = [
        {
          name: "Logout",
          route: "/authentication",
          component: <Login />,
        },
      ]
    }
    // eslint-disable-next-line no-console
    if (name === "Notifications") {
      collapse = [
        {
          name: "test1",
        },
        { name: "test2" },
      ]
    }
    if (collapse && name === dropdownName) {
      template = collapse.map((item) => {
        const linkComponent = {
          component: MuiLink,
          href: item.href,
          target: "_blank",
          rel: "noreferrer",
        }

        const routeComponent = {
          component: Link,
          to: item.route,
        }

        return (
          <MKTypography
            key={item.name}
            {...(item.route ? routeComponent : linkComponent)}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            variant="button"
            textTransform="capitalize"
            minWidth={item.description ? "14rem" : "12rem"}
            color={item.description ? "dark" : "text"}
            fontWeight={item.description ? "bold" : "regular"}
            py={item.description ? 1 : 0.625}
            px={2}
            sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
              borderRadius: borderRadius.md,
              cursor: "pointer",
              transition: "all 300ms linear",

              "&:hover": {
                backgroundColor: grey[200],
                color: dark.main,

                "& *": {
                  color: dark.main,
                },
              },
            })}
            onMouseEnter={({ currentTarget }) => {
              if (item.dropdown) {
                setNestedDropdown(currentTarget)
                setNestedDropdownEl(currentTarget)
                setNestedDropdownName(item.name)
              }
            }}
            onMouseLeave={() => {
              if (item.dropdown) {
                setNestedDropdown(null)
              }
            }}
          >
            {item.description ? (
              <MKBox>
                {item.name}
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
            ) : (
              item.name
            )}
            {item.collapse && (
              <Icon
                fontSize="small"
                sx={{ fontWeight: "normal", verticalAlign: "middle", mr: -0.5 }}
              >
                keyboard_arrow_right
              </Icon>
            )}
          </MKTypography>
        )
      })
    }

    return template
  })

  // Routes dropdown menu
  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="top-start"
      transition
      style={{ zIndex: 10 }}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      onMouseEnter={() => setDropdown(dropdownEl)}
      onMouseLeave={() => {
        if (!nestedDropdown) {
          setDropdown(null)
          setDropdownName("")
        }
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MKBox borderRadius="lg">
            <MKTypography variant="h1" color="white">
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </MKTypography>
            <MKBox shadow="lg" borderRadius="lg" p={2} mt={2}>
              {user ? renderLoggedRoutes : renderRoutes}
            </MKBox>
          </MKBox>
        </Grow>
      )}
    </Popper>
  )

  // Render routes that are nested inside the dropdown menu routes
  const renderNestedRoutes = routes.map(({ collapse }) =>
    collapse
      ? collapse.map(({ name: parentName, collapse: nestedCollapse }) => {
          let template

          if (parentName === nestedDropdownName) {
            template = nestedCollapse?.map((item) => {
              const linkComponent = {
                component: MuiLink,
                href: item.href,
                target: "_blank",
                rel: "noreferrer",
              }

              const routeComponent = {
                component: Link,
                to: item.route,
              }

              return (
                <MKTypography
                  key={item.name}
                  {...(item.route ? routeComponent : linkComponent)}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  variant="button"
                  textTransform="capitalize"
                  minWidth={item.description ? "14rem" : "12rem"}
                  color={item.description ? "dark" : "text"}
                  fontWeight={item.description ? "bold" : "regular"}
                  py={item.description ? 1 : 0.625}
                  px={2}
                  sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.md,
                    cursor: "pointer",
                    transition: "all 300ms linear",

                    "&:hover": {
                      backgroundColor: grey[200],
                      color: dark.main,

                      "& *": {
                        color: dark.main,
                      },
                    },
                  })}
                >
                  {item.description ? (
                    <MKBox>
                      {item.name}
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
                  ) : (
                    item.name
                  )}
                  {item.collapse && (
                    <Icon
                      fontSize="small"
                      sx={{ fontWeight: "normal", verticalAlign: "middle", mr: -0.5 }}
                    >
                      keyboard_arrow_right
                    </Icon>
                  )}
                </MKTypography>
              )
            })
          }

          return template
        })
      : null
  )

  // Dropdown menu for the nested dropdowns
  const nestedDropdownMenu = (
    <Popper
      anchorEl={nestedDropdown}
      popperRef={null}
      open={Boolean(nestedDropdown)}
      placement="right-start"
      transition
      style={{ zIndex: 10 }}
      onMouseEnter={() => {
        setNestedDropdown(nestedDropdownEl)
      }}
      onMouseLeave={() => {
        setNestedDropdown(null)
        setNestedDropdownName("")
        setDropdown(null)
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MKBox ml={2.5} mt={-2.5} borderRadius="lg">
            <MKBox shadow="lg" borderRadius="lg" py={1.5} px={1} mt={2}>
              {renderNestedRoutes}
            </MKBox>
          </MKBox>
        </Grow>
      )}
    </Popper>
  )

  return (
    <Container sx={sticky ? { position: "sticky", top: 0, zIndex: 10 } : null}>
      <MKBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : "saturate(200%) blur(30px)",
        })}
      >
        <MKBox display="flex" justifyContent="space-between" alignItems="center">
          <MKBox
            component={Link}
            to="/"
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            pl={relative || transparent ? 0 : { xs: 0, lg: 1 }}
          >
            {logoUrl && !mobileNavbar && (
              <MKBox
                component="img"
                src={logoUrl}
                alt="logo"
                width={{ xs: "150px", lg: "190px" }}
                position="absolute"
                zIndex={1}
                sx={{ top: "100px" }}
                className="logo"
              />
            )}
          </MKBox>
          <MKBox
            color="inherit"
            display={{ xs: "none", lg: "flex" }}
            ml="auto"
            mr={center ? "auto" : 0}
          >
            {renderNavbarItems}
          </MKBox>
          {/* <DefaultNavbarDropdown
            key="notifications"
            name=""
            icon={
              <Badge badgeContent={4} color="secondary">
                <NotificationIcon color="dark" />
              </Badge>
            }
            route="/notifications"
            collapse
            light={light}
            onMouseEnter={({ currentTarget }) => {
              setDropdown(currentTarget)
              setDropdownEl(currentTarget)
              setDropdownName("notifications")
            }}
            onMouseLeave={() => setDropdown(null)}
          /> */}
          {user?.admin && (
            <DefaultNavbarDropdown
              key="admin"
              name="admin"
              icon={<Icon>settings</Icon>}
              route="/admin"
              collapse={false}
              light={light}
            />
          )}

          <MKBox ml={{ xs: "auto", lg: 0 }}>
            {action &&
              (action.type === "internal" ? (
                <MKButton
                  component={Link}
                  to={action.route}
                  variant={
                    action.color === "white" || action.color === "default"
                      ? "contained"
                      : "gradient"
                  }
                  color={action.color ? action.color : "info"}
                  size="small"
                >
                  {action.label}
                </MKButton>
              ) : (
                <MKButton
                  component="a"
                  href={action.route}
                  target="_blank"
                  rel="noreferrer"
                  variant={
                    action.color === "white" || action.color === "default"
                      ? "contained"
                      : "gradient"
                  }
                  color={action.color ? action.color : "info"}
                  size="small"
                >
                  {action.label}
                </MKButton>
              ))}
          </MKBox>
          <MKBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color={transparent ? "white" : "inherit"}
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon color="primary" fontSize="default">
              {mobileNavbar ? "close" : "menu"}
            </Icon>
          </MKBox>
        </MKBox>
        <MKBox
          bgColor={transparent ? "white" : "transparent"}
          shadow={transparent ? "lg" : "none"}
          borderRadius="xl"
          px={transparent ? 2 : 0}
        >
          {mobileView && <DefaultNavbarMobile routes={routes} open={mobileNavbar} />}
        </MKBox>
      </MKBox>
      {dropdownMenu}
      {nestedDropdownMenu}
    </Container>
  )
}
// DefaultNavbar default props
DefaultNavbar.defaultProps = {
  action: null,
  transparent: false,
  light: false,
  sticky: false,
  relative: false,
  center: false,
  logoUrl: null,
  brand: null,
}
// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  logoUrl: PropTypes.string,
  routes: PropTypes.instanceOf(Object).isRequired,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
  center: PropTypes.bool,
}

export default DefaultNavbar
