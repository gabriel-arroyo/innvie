import React from "react"
// Images
import author1 from "assets/images/team-2.jpg"
import author2 from "assets/images/ivana-squares.jpg"
import author3 from "assets/images/marie.jpg"
import RaisedBlogCard from "examples/Cards/BlogCards/RaisedBlogCard"
import Grid from "@mui/material/Grid"

function PlacesCards2() {
  const post1 =
    "https://www.littleguidedetroit.com/wp-content/uploads/2020/07/Metro-indian-springs-dealswithdayna.jpg"
  const post2 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Kv2WRRK12mvC0h9CGmYyPS88f6cml1fzaA&usqp=CAU"
  const post3 =
    "https://www.bridgemi.com/sites/default/files/styles/full_width_image/public/2021-07/Ambassador%20Bridge.jpg?itok=xkdUsWye"
  return (
    <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
      <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }} sx={{ display: "flex" }}>
        <RaisedBlogCard
          image={post1}
          category={{ color: "primary", label: "house" }}
          title="Willow Metropark"
          description="It is a park located on the banks of the Huron River. The park consists of a wide variety of trails and recreational areas, including an 18-hole golf course, Washago Pond, bike trails, playgrounds, a pool and more."
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
          description="It offers 100,000 square feet of exciting, action-packed choices, from slots and table games to live poker."
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
          title="Ambassador Bridge"
          description="We are less than 20 minutes from the Ambassador Bridge, which is an international suspension bridge that connects Detroit, in the U.S. state of Michigan, with Windsor in the Canadian province of Ontario."
          author={{
            image: author3,
            name: "Mathew Glock",
            date: "Posted on 28 February",
          }}
          action={{ type: "internal", route: "/pages/blogs/single-article" }}
        />
      </Grid>
    </Grid>
  )
}

export default PlacesCards2
