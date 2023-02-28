/* eslint-disable react/prop-types */
import React from "react"
import MuiLink from "@mui/material/Link"
import { Link } from "react-router-dom"
import Icon from "@mui/material/Icon"
import MKTypography from "components/MKTypography"
import MKBox from "components/MKBox"

function StandardRoute({
  collapse,
  setNestedDropdown,
  setNestedDropdownEl,
  setNestedDropdownName,
}) {
  const { href, name, route, description, dropdown } = collapse
  const linkComponent = {
    component: MuiLink,
    href,
    target: "_blank",
    rel: "noreferrer",
  }

  const routeComponent = {
    component: Link,
    to: route,
  }
  return (
    <MKTypography
      key={name}
      {...(route ? routeComponent : linkComponent)}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      variant="button"
      textTransform="capitalize"
      minWidth={description ? "14rem" : "12rem"}
      color={description ? "dark" : "text"}
      fontWeight={description ? "bold" : "regular"}
      py={description ? 1 : 0.625}
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
        if (dropdown) {
          setNestedDropdown(currentTarget)
          setNestedDropdownEl(currentTarget)
          setNestedDropdownName(name)
        }
      }}
      onMouseLeave={() => {
        if (dropdown) {
          setNestedDropdown(null)
        }
      }}
    >
      {description ? (
        <MKBox>
          {name}
          <MKTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="regular"
            sx={{ transition: "all 300ms linear" }}
          >
            {description}
          </MKTypography>
        </MKBox>
      ) : (
        name
      )}
      {collapse.collapse && (
        <Icon fontSize="small" sx={{ fontWeight: "normal", verticalAlign: "middle", mr: -0.5 }}>
          keyboard_arrow_right
        </Icon>
      )}
    </MKTypography>
  )
}

export default StandardRoute
