import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import useMovies from "../hooks/useMovies";
import { useParams } from "react-router-dom";
import Background from "..//..//image.jpg";
import { useNavigate } from "react-router-dom"; 
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
 
const axios = require('axios');

const ControlPanelPage = () => { 
  const { user } = useUser();
  const navigate = useNavigate();
  const [spacing, setSpacing] = React.useState(2);
  const [currentUserId, setCurrentUserId] = React.useState('');

  const { pending, error, movies, handleGetMovies, handleGetMoviesSearch} = useMovies();
  const [query, setQuery]=useState('');
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [moviesToShow, setoviesToShow] = useState([]);

  const styles = {
    paperContainer: {
        backgroundImage: `url(${Background})`
    }
};

const { id } = useParams();

const handleToUsersPage = () => { 
  navigate (ROUTES.USERS_PAGE)
}

const handleToUsersToAdmibPage = () => {
  navigate (ROUTES.USERS_TO_ADMIN_PAGE)
}

const handleToUsersToLimitCallsPage = () => {
  navigate (ROUTES.LIMIT_USER_CALLS)
}

  useEffect(() => {
    if(localStorage.getItem("MANAGERDELETEMOIVE")) {
      localStorage.removeItem("deletingMovie"); 
      localStorage.removeItem("MANAGERDELETEMOIVE"); 
      // console.log(localStorage.getItem("deletingMovieByManagerCurrentUserId"))
      // console.log("GGGGGGGGUGY")
      setCurrentUserId(localStorage.getItem("deletingMovieByManagerCurrentUserId"))
      localStorage.removeItem("deletingMovieByManagerCurrentUserId");
      // localStorage.removeItem("deletingMovieByManagerROUTES");
      // navigate (`${ROUTES.USER_VOTES_FOR_MANAGER}/${currentUserId}`) 
   }
    if(localStorage.getItem ("deletingMovie")) {
       localStorage.removeItem("deletingMovie");
       localStorage.setItem("deletedMovie", "Yes")  
       navigate (ROUTES.RATE_MOVIES)
    }
    
if (id) {
    handleGetMoviesSearch(id);
    } else {
      handleGetMovies();
    }
}, [id]);

if (movies) { 
    return (
<Container> 
           <PageHeader
                   title="Control Panel Page For Admin"
                   subtitle="Here you can make managing change"
                 />
    <Container align="center" sx={{mb: "15px"}}>
            <Typography>Your Options Mister Manager:</Typography>
            <Button variant="contained" onClick={handleToUsersPage}>Change Users Abilities</Button>
    </Container>

    <Container align="center" sx={{mb: "15px"}}>
            <Button variant="contained" color="secondary" onClick={handleToUsersToAdmibPage}>Change Users to Admins</Button>
    </Container>

    <Container align="center">
            <Button variant="contained" color="error" onClick={handleToUsersToLimitCallsPage}>Change Users Calls limit Per Day</Button>
    </Container>
</Container>
    );
  };
}

export default ControlPanelPage;
