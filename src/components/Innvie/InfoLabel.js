/* eslint-disable react/prop-types */
import React from "react"

// eslint-disable-next-line no-unused-vars
export default function ({ tooltip }) {
  return (
    <div
      style={{
        position: "fixed",
        left: "50vw",
        bottom: 50,
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
        padding: 10,

        fontSize: 20,
        borderRadius: 5,
        zIndex: 85,
      }}
    >
      {tooltip}
    </div>
  )
}
