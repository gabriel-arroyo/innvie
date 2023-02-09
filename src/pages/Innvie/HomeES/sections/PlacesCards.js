import React from "react"
import PropTypes from "prop-types"
// Images
import author1 from "assets/images/team-2.jpg"
import RaisedBlogCard from "examples/Cards/BlogCards/RaisedBlogCard"
import Grid from "@mui/material/Grid"

function shuffleArray(data) {
  const array = data
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
function PlacesCards({ number }) {
  const [showCards, setShowcards] = React.useState([])
  const post1 =
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/83/a0/c8/exterior.jpg?w=700&h=-1&s=1"
  const post2 = "https://www.adonde-y-cuando.es/site/images/illustration/detroit-michigan_723.jpg"
  const post3 =
    "https://www.greatlakescruises.com/uploads/1/0/6/4/106440933/lake-erie-s-history-orig_orig.jpg"
  const post4 = "https://static.toiimg.com/photo/49334503.cms"
  const post5 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Kv2WRRK12mvC0h9CGmYyPS88f6cml1fzaA&usqp=CAU"
  const post6 =
    "https://www.bridgemi.com/sites/default/files/styles/full_width_image/public/2021-07/Ambassador%20Bridge.jpg?itok=xkdUsWye"
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
    {
      title: "Instituto de Arte de Detroit",
      description:
        "El Instituto de Arte de Detroit abrió sus puertas en el año 1885 y es uno de los museos más grandes de Estados Unidos. Para que te hagas una idea, exhibe una colección de más de 65.000 piezas con un valor de, aproximadamente, 1000 millones de dólares.",
      image: post4,
    },
    {
      title: "Greektown Casino-Hotel",
      description:
        "Ofrece 100,000 pies cuadrados de opciones emocionantes y llenas de acción, desde máquinas tragamonedas y juegos de mesa hasta póquer en vivo.",
      image: post5,
    },
    {
      title: "Puente Ambassador",
      description:
        "Nos encontramos a menos de 20 minutos del puente Ambassador que es un puente colgante internacional que une Detroit, en el Estado estadounidense de Míchigan, con Windsor en la provincia canadiense de Ontario.",
      image: post6,
    },
  ]

  React.useEffect(() => {
    const shuffled = shuffleArray(cards)
    const show = shuffled.slice(0, number)
    setShowcards(show)
  }, [number])
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
    </Grid>
  )
}

export default PlacesCards

PlacesCards.defaultProps = {
  number: 3,
}

PlacesCards.propTypes = {
  number: PropTypes.number,
}
