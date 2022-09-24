import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Images
import author1 from "assets/images/team-2.jpg";
import author2 from "assets/images/ivana-squares.jpg";
import author3 from "assets/images/marie.jpg";
import RaisedBlogCard from "examples/Cards/BlogCards/RaisedBlogCard";

function Places() {
  const post1 =
    "https://images.unsplash.com/photo-1592489637182-8c172d6d7826?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80";
  const post2 =
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80";
  const post3 =
    "https://images.unsplash.com/photo-1444877466744-dc2f2af2b931?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80";
  return (
    <MKBox component="section" py={7}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={12}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 0, mx: "auto" }}
        >
          <MKTypography variant="h2" fontWeight="bold" pb={7} color="white">
            Lugares cercanos
          </MKTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }} sx={{ display: "flex" }}>
              <RaisedBlogCard
                image={post1}
                category={{ color: "primary", label: "house" }}
                title="National Lakeshore"
                description="Scelerisque malesuada ad neque auctor dictumst sed mi auctor vestibulum arcu ad dapibus posuere euismod at a vestibulum odio integer sapien."
                author={{
                  image: author1,
                  name: "Mathew Glock",
                  date: "Posted on 28 February",
                }}
                action={{ type: "internal", route: "/pages/blogs/single-article" }}
              />
            </Grid>
            <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }}>
              <RaisedBlogCard
                image={post2}
                category={{ color: "info", label: "house" }}
                title="Bay City"
                description="Scelerisque malesuada ad neque auctor dictumst sed mi auctor vestibulum arcu ad dapibus posuere euismod at a vestibulum odio integer sapien."
                author={{
                  image: author2,
                  name: "Mathew Glock",
                  date: "Posted on 28 February",
                }}
                action={{ type: "internal", route: "/pages/blogs/single-article" }}
              />
            </Grid>
            <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }}>
              <RaisedBlogCard
                image={post3}
                category={{ color: "warning", label: "house" }}
                title="Grand Rapids"
                description="Scelerisque malesuada ad neque auctor dictumst sed mi auctor vestibulum arcu ad dapibus posuere euismod at a vestibulum odio integer sapien."
                author={{
                  image: author3,
                  name: "Mathew Glock",
                  date: "Posted on 28 February",
                }}
                action={{ type: "internal", route: "/pages/blogs/single-article" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
