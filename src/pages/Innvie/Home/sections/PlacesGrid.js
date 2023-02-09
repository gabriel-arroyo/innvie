import React from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"

// Images
import author1 from "assets/images/team-2.jpg"
// import author2 from "assets/images/ivana-squares.jpg";
import HorizontalCard from "examples/Cards/BlogCards/HorizontalCard"

function PlacesGrid() {
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
        "Test your luck with gambling options, such as 77 casino gaming tables, VIP casino room and 2660 slot machines. Indulge in Swedish massages at the on-site spa, D.Tour Spa. Try the delicious dishes offered by the 3 restaurants on the property.",
      image: post1,
      url: "https://goo.gl/maps/VpPMcZExLNsT9wvr6",
    },
    {
      title: "Detroit Downtown",
      description:
        "Visit cultural centers; for example, the Detroit Arts Festival in downtown Detroit, the University Commons-Palmer Park in Detroit's Northwest District is near Detroit Mercy University and Marygrove College and has historic neighborhoods, including Palmer Woods, Sherwood Forest, and Green Acres.",
      image: post2,
      url: "https://goo.gl/maps/TJbDkw21F8L696R96",
    },
    {
      title: "Lake Erie",
      description:
        "For its size (it occupies about 25,700 square kilometers), it is considered the thirteenth natural lake in the world. Completely navigable, it has an elevation above sea level of 173 meters and an average depth of 19 meters; in this sense, it is the least deep of the Great Lakes.",
      image: post3,
      url: "https://goo.gl/maps/5j9c2KZPqapcK6Ys8",
    },
    {
      title: "Detroit Institute of Arts",
      description:
        "The Detroit Institute of Arts opened its doors in 1885 and is one of the largest museums in the United States. To give you an idea, it exhibits a collection of more than 65,000 pieces with a value of approximately $ 1 billion.",
      image: post4,
      url: "https://goo.gl/maps/5j9c2KZPqapcK6Ys8",
    },
    {
      title: "Greektown Casino-Hotel",
      description:
        "It offers 100,000 square feet of exciting and action-packed options, from slot machines and table games to live poker.",
      image: post5,
      url: "https://goo.gl/maps/fgkGnThmjg4LuMET8",
    },
    {
      title: "Ambassador Bridge",
      description:
        "We are less than 20 minutes from the Ambassador Bridge, which is an international suspension bridge that connects Detroit, in the U.S. state of Michigan, with Windsor in the Canadian province of Ontario.",
      image: post6,
      url: "https://goo.gl/maps/wCeJwGJqmEYQqChy8",
    },
  ]
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
          <MKTypography variant="h2" fontWeight="bold" pb={7}>
            Near places
          </MKTypography>
          <Grid container spacing={3}>
            {cards.map(({ title, description, image, url }) => (
              <Grid item xs={12} lg={6} mb={{ xs: 3, lg: 0 }} sx={{ display: "flex" }}>
                <HorizontalCard
                  image={image}
                  url={url}
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
        </Grid>
      </Container>
    </MKBox>
  )
}

export default PlacesGrid
