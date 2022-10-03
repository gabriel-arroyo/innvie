import React from "react";
// Images
import author1 from "assets/images/team-2.jpg";
import author2 from "assets/images/ivana-squares.jpg";
import author3 from "assets/images/marie.jpg";
import RaisedBlogCard from "examples/Cards/BlogCards/RaisedBlogCard";
import Grid from "@mui/material/Grid";

function PlacesCards2() {
  const post1 =
    "https://www.littleguidedetroit.com/wp-content/uploads/2020/07/Metro-indian-springs-dealswithdayna.jpg";
  const post2 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Kv2WRRK12mvC0h9CGmYyPS88f6cml1fzaA&usqp=CAU";
  const post3 =
    "https://www.bridgemi.com/sites/default/files/styles/full_width_image/public/2021-07/Ambassador%20Bridge.jpg?itok=xkdUsWye";
  return (
    <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
      <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }} sx={{ display: "flex" }}>
        <RaisedBlogCard
          image={post1}
          category={{ color: "primary", label: "house" }}
          title="Willow Metropark"
          description="Es un parque localizado en las orillas del río Huron. El parque consta de una amplia variedad de senderos y áreas recreativas, que incluyen un campo de golf de 18 hoyos, el estanque Washago, senderos para bicicletas, juegos para niños, una alberca y más."
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
          title="Greektown Casino-Hotel"
          description="Ofrece 100,000 pies cuadrados de opciones emocionantes y llenas de acción, desde máquinas tragamonedas y juegos de mesa hasta póquer en vivo."
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
          title="Puente Ambassador"
          description="Nos encontramos a menos de 20 minutos de el puente Ambassador que es un puente colgante internacional que une Detroit, en el Estado estadounidense de Míchigan, con Windsor en la provincia canadiense de Ontario.​"
          author={{
            image: author3,
            name: "Mathew Glock",
            date: "Posted on 28 February",
          }}
          action={{ type: "internal", route: "/pages/blogs/single-article" }}
        />
      </Grid>
    </Grid>
  );
}

export default PlacesCards2;
