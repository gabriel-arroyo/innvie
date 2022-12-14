import React from "react";
import Grid from "@mui/material/Grid";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
import PropTypes from "prop-types";
import { Container } from "@mui/material";

function Offers({ cards }) {
  return (
    <Container
      sx={{
        p: 2,
        mx: { xs: 2, lg: 3 },
        mt: "2rem",
        mb: 10,
        zIndex: 1,
        height: "100%",
      }}
    >
      <Grid container spacing={2}>
        {cards.map(
          ({
            variant,
            color,
            icon,
            title: cardTitle,
            description: cardDescription,
            description2,
            description3,
          }) => (
            <Grid key={icon} item xs={11} sm={11} lg={4}>
              <FilledInfoCard
                variant={variant}
                color={color}
                icon={icon}
                title={cardTitle}
                description={cardDescription}
                description2={description2}
                description3={description3}
                action={{
                  type: "internal",
                  route: "/pages/company/about-us",
                  label: "Conoce más",
                }}
              />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
}

export default Offers;

Offers.propTypes = {
  cards: PropTypes.instanceOf(Array).isRequired,
};
