import React from "react";
import Typography from "@mui/material/Typography";
import NavBarLink from "../../../../routes/NavBarLink";
import ROUTES from "../../../../routes/routesModel";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Logo = () => {
  return (
    <NavBarLink to={ROUTES.ROOT}>
      <LocalMoviesIcon></LocalMoviesIcon>
      <Typography
        variant="h4"
        sx={{
          display: { xs: "none", md: "inline-flex" },
          marginRight: 2,
          fontFamily: "fantasy",
        }}
      >
        {/* <LocalMoviesIcon></LocalMoviesIcon> */}
        G-Movies
      </Typography>
    </NavBarLink>
  );
};

export default Logo;
