import React from "react";
import PropTypes from "prop-types";
// Images
import author1 from "assets/images/team-2.jpg";
import RaisedBlogCard from "examples/Cards/BlogCards/RaisedBlogCard";
import Grid from "@mui/material/Grid";

function PlacesCards({ number }) {
  const [showCards, setShowcards] = React.useState([]);
  const post1 =
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/83/a0/c8/exterior.jpg?w=700&h=-1&s=1";
  const post2 = "https://www.adonde-y-cuando.es/site/images/illustration/detroit-michigan_723.jpg";
  const post3 =
    "https://www.greatlakescruises.com/uploads/1/0/6/4/106440933/lake-erie-s-history-orig_orig.jpg";

  const cards = [
    {
      title: "Motor City Casino",
      description:
        "Prueba tu suerte con las opciones de azar, como 77 mesas de juegos de casino, sala de casino VIP y 2660 tragamonedas. Consiéntete con masajes suecos en el spa de las instalaciones, D.Tour Spa. Prueba los deliciosos platillos que ofrecen los 3 restaurantes de la propiedad.",
      image: post1,
    },
    {
      title: "Detroit Downtown",
      description:
        "Visita los centros culturales; por ejemplo, el Festival Detroit de las Artes en el centro de la ciudad, la Universidad Commons-Palmer Park en el distrito Noroeste de Detroit está cerca de la Universidad Detroit Mercy y el Colegio Marygrove y tiene barrios históricos, incluyendo Palmer Woods, Sherwood Forest, y Green Acres.",
      image: post2,
    },
    {
      title: "Lake Erie",
      description:
        "Por su tamaño (ocupa unos 25.700 kilómetros cuadrados), está considerado como el decimotercer lago natural del mundo. Completamente navegable, cuenta con una elevación sobre el nivel del mar de 173 metros y una profundidad media de 19 metros; en este sentido, es el menos profundo del conjunto de los Grandes Lagos.",
      image: post3,
    },
  ];

  React.useEffect(() => {
    const show = cards.slice(0, number);
    setShowcards(show);
  }, [number]);
  return (
    <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
      {showCards.map(({ title, description, image }) => (
        <Grid key={title} item xs={12} lg={4} mb={{ xs: 3, lg: 0 }} sx={{ display: "flex" }}>
          <RaisedBlogCard
            image={image}
            category={{ color: "primary", label: "house" }}
            title={title}
            description={description}
            author={{
              image: author1,
              name: "Mathew Glock",
              date: "Posted on 28 February",
            }}
            action={{ type: "internal", route: "/pages/blogs/single-article" }}
          />
        </Grid>
      ))}
      {/* <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }} sx={{ display: "flex" }}>
        <RaisedBlogCard
          image={post1}
          category={{ color: "primary", label: "house" }}
          title="Motor City Casino"
          description="Prueba tu suerte con las opciones de azar, como 77 mesas de juegos de casino, sala de casino VIP y 2660 tragamonedas. Consiéntete con masajes suecos en el spa de las instalaciones, D.Tour Spa. Prueba los deliciosos platillos que ofrecen los 3 restaurantes de la propiedad."
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
          title="Detroit Downtown"
          description="Visita los centros culturales; por ejemplo, el Festival Detroit de las Artes en el centro de la ciudad, la Universidad Commons-Palmer Park en el distrito Noroeste de Detroit está cerca de la Universidad Detroit Mercy y el Colegio Marygrove y tiene barrios históricos, incluyendo Palmer Woods, Sherwood Forest, y Green Acres."
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
          title="Lake Erie"
          description="Por su tamaño (ocupa unos 25.700 kilómetros cuadrados), está considerado como el decimotercer lago natural del mundo. Completamente navegable, cuenta con una elevación sobre el nivel del mar de 173 metros y una profundidad media de 19 metros; en este sentido, es el menos profundo del conjunto de los Grandes Lagos."
          author={{
            image: author3,
            name: "Mathew Glock",
            date: "Posted on 28 February",
          }}
          action={{ type: "internal", route: "/pages/blogs/single-article" }}
        />
      </Grid> */}
    </Grid>
  );
}

export default PlacesCards;

PlacesCards.defaultProps = {
  number: 3,
};

PlacesCards.propTypes = {
  number: PropTypes.number,
};
