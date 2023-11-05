import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
<Container sx={{mb: "20px"}}>
  Here you can see which movies are recommended by site users and enjoy the movies that others have already reviewed for you.
</Container>
<Container sx={{mb: "20px"}}>
The role of this application is to serve its users with information for recommended movies.
Each user has the ability to locate and search for movies through the search bar at the top-right 
of the page and also to vote for a number of movies of his choice (the amount is limited by the administrator).
</Container>
<Container sx={{mb: "20px"}}>
Each user will have access to the winners page and there will be listed which films received the highest marks by all the users of the application.
Any user will be able to delete movies from his list and change the grade he gave to his movies on the "MY RATES" page.
</Container>
<Container sx={{mb: "20px"}}>
Also, the movies that the original administrator of the application voted for will be displayed on the main page for all users.
</Container>
<Container sx={{mb: "20px"}}>
If you forgot your password, you can change it through the LOG-IN page on the link that says "Forgot your password?".
</Container>
<Container sx={{mb: "20px"}}>
Each user will have a starting point where he can vote for 5 different movies, the administrator can change this up to 15 votes if he wants.
If you want to change this, please contact the manager at 0525705286 (;
</Container>
<Container sx={{mb: "20px"}}>
Enjoy!!!
</Container>

        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img src="/assets/images/movie.png" alt="movie" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
