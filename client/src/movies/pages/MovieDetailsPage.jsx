import { Button,
         Container,
         Typography,
         Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import useMovies from "../hooks/useMovies";
import { number } from "joi";
import { useUser } from "../../users/providers/UserProvider";
import { useSnack } from "../../providers/SnackbarProvider";
const API_IMG="https://image.tmdb.org/t/p/w500/";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { pending, error, movies, handleGetMovies, handleGetMoviesSearchDetailsPage, handleVoteMovie } = useMovies();
  const { user } = useUser();

  const StyledRating = styled(Rating)({ 
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

const [value, setValue] = useState("")
const {setSnack} = useSnack ();

const handleMovieRate = () => {
  // console.log(user.isAdmin)
      // console.log(user._id)
  if (user == null) {
    setSnack ('error', 'You Cant Vote, Please LOGIN or SIGNUP');
  } else {
  let movieInfoForDB = {
  grade: value,
  user_id: `${user._id}`,
  userIsAdmin: `${user.isAdmin}`,
  release_date: `${localStorage.getItem("release_date")}`,
  overview: `${localStorage.getItem("overview")}`,
  API_IMG: `${localStorage.getItem("API_IMG")+localStorage.getItem("poster_path")}`, 
  title: `${localStorage.getItem("title")}`,
  original_language: `${localStorage.getItem("original_language")}`
  }
  handleVoteMovie(movieInfoForDB, user._id)
  }
}

const handleMovieRateDataFromRatePage = () => {
  if (user == null) {
    setSnack ('error', 'You Cant Vote, Please LOGIN or SIGNUP');
  } else {
  let movieInfoForDB = {
  grade: value,
  user_id: user._id,
  release_date: `${localStorage.getItem("release_date")}`,
  overview: `${localStorage.getItem("overview")}`,
  API_IMG: `${localStorage.getItem("API_IMG")}`,
  title: `${localStorage.getItem("title")}`,
  original_language: `${localStorage.getItem("original_language")}`
  }
  handleVoteMovie(movieInfoForDB)
  }
}

useEffect(() => {
  handleGetMovies()
}, []);

if (!localStorage.getItem("comeFromRatePage")) {
  return (
    <Container sx={{mt: "50px", mb: "200px"}}>
      <Typography sx={{mt: "50px"}} variant="h3">{localStorage.getItem("title")}</Typography>
      <Typography>Original language: {localStorage.getItem("original_language")}</Typography>
      <Typography>Release date: {localStorage.getItem("release_date")}</Typography>
      <img className="card-img-top"
       style={{width:'17rem'}}
       src={localStorage.getItem("API_IMG")+localStorage.getItem("poster_path")} />
      <Typography>{localStorage.getItem("overview")}</Typography>
  
  <Box
    sx={{
      '& > legend': { mt: 2 },
    }}
  >
    <Rating name="customized-10" defaultValue={2} max={10} onChange={(event, newValue) => {setValue(newValue)}} />
  </Box>
      <Button disabled = {!value} color="success" variant="contained" onClick={handleMovieRate} sx={{mb: "50px"}}>Rate this movie</Button>
    </Container>
  );
}

if (localStorage.getItem("comeFromRatePage")) {
  return (
    <Container sx={{mt: "50px", mb: "200px"}}>
      <Typography sx={{mt: "50px"}} variant="h3">{localStorage.getItem("title")}</Typography>
      <Typography>Original language: {localStorage.getItem("original_language")}</Typography>
      <Typography>Release date: {localStorage.getItem("release_date")}</Typography>
      <img className="card-img-top"
       style={{width:'17rem'}}
      //  src={localStorage.getItem("API_IMG")} />
       src={localStorage.getItem("API_IMG")} />
      <Typography>{localStorage.getItem("overview")}</Typography>
  
  <Box
    sx={{
      '& > legend': { mt: 2 },
    }}
  >
    <Rating name="customized-10" defaultValue={2} max={10} onChange={(event, newValue) => {setValue(newValue)}} />
  </Box>
      <Button disabled = {!value} color="success" variant="contained" onClick={handleMovieRateDataFromRatePage} sx={{mb: "50px"}}>Rate this movie</Button>
  
  
    </Container>
  );
}



}
  
//   if (!movies){
//     return (
//       <Container maxWidth="lg">
//         <Typography>Sorry We Have A Problem</Typography>
//       </Container>
//     );
//   }
// };

export default MovieDetailsPage;
