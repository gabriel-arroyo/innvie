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
        "Try your luck with gambling options, such as 77 casino gaming tables, VIP casino room and 2660 slot machines. Indulge in Swedish massages at the property's D.Tour Spa. Try the delicious dishes offered by the 3 restaurants on site.",
      image: post1,
    },
    {
      title: "Detroit Downtown",
      description:
        "Visit cultural centers; for example, the Detroit Arts Festival in the city center, the University Commons-Palmer Park in the Northwest district of Detroit is near the University of Detroit Mercy and Marygrove College and has historic neighborhoods, including Palmer Woods, Sherwood Forest, and Green Acres.",
      image: post2,
    },
    {
      title: "Lake Erie",
      description:
        "For its size (it covers about 25,700 square kilometers), it is considered the thirteenth natural lake in the world. Completely navigable, it has an elevation above sea level of 173 meters and an average depth of 19 meters; in this sense, it is the least deep of the group of the Great Lakes.",
      image: post3,
    },
    {
      title: "Detroit Institute of Arts",
      description:
        "The Detroit Institute of Arts opened its doors in 1885 and is one of the largest museums in the United States. To give you an idea, it exhibits a collection of more than 65,000 pieces with a value of approximately $ 1 billion.",
      image: post4,
    },
    {
      title: "Greektown Casino-Hotel",
      description:
        "The Greektown Casino-Hotel offers 100,000 square feet of exciting and action-packed options, from slot machines and table games to live poker.",
      image: post5,
    },
    {
      title: "Ambassador Bridge",
      description:
        "We are less than 20 minutes from the Ambassador Bridge, which is an international suspension bridge that connects Detroit, in the U.S. state of Michigan, with Windsor in the Canadian province of Ontario.",
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
