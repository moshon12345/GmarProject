import { Container, Typography, Grid, Button, Divider } from "@mui/material";
import Box from '@mui/system/Box';
import React from "react";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import useMovies from "../hooks/useMovies";
import { useUser } from "../../users/providers/UserProvider";
import { useState } from "react";
import styled from '@mui/system/styled';
import Background from "..//..//image.jpg";
import { useParams } from "react-router-dom";
import MovieBox from "../../movie/MovieBox";
import StarIcon from '@mui/icons-material/Star';
import {UserProvider} from '../../users/providers/UserProvider';
import Rating from '@mui/material/Rating';
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider"; 

const RatedMovUserForManager = (userId, title, poster_path, vote_average, release_date, overview, original_language, API_IMG) => {

  const { pending, error, movies, 
    handleGetMovies, 
    handleMyRatedMovies, 
    handleDeleteMovie, 
    handleEditMovieRate,
    handleDeleteMovieByManager} = useMovies();
  const [query, setQuery]=useState('');
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [moviesToShow, setoviesToShow] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("")
  const [currentUserEmail, setCurrentUserEmail] = useState("")

  const navigate = useNavigate();
  const [spacing, setSpacing] = React.useState(2);
  const {user} = useUser ();
  const {setSnack} = useSnack ();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  const Item = styled('div')(({ theme }) => ({ 
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(5),
    borderRadius: '4px',
    textAlign: 'center',
    gridArea: 'auto'
  }));

  const styles = {
    paperContainer: {
        backgroundImage: `url(${Background})`,
    }
};

const [value, setValue] = useState("")
const [btn, setBtn] = useState(0)
const [render, setRender] = useState("")

const deleteMovie = (movie) => {
  localStorage.setItem("MANGAERDELETINGMOVIE", "MANGAERDELETINGMOVIE")  
  localStorage.setItem("deletingMovieByManagerCurrentUserId", `${movie.user_id}`)  
  localStorage.setItem("currentUserEmail", currentUserEmail)  
  localStorage.setItem("currentUserId", currentUserId)  
  handleDeleteMovieByManager(movie);
};

  useEffect(() => { 
    if (localStorage.getItem("?userVoteForManager?")) {
        setCurrentUserId(localStorage.getItem("?userVoteForManager?"))
        setCurrentUserEmail(localStorage.getItem("?userVoteForManagerEmail?"))
        handleMyRatedMovies(localStorage.getItem("?userVoteForManager?"));   
        localStorage.removeItem("?userVoteForManager?");
        localStorage.removeItem("?userVoteForManagerEmail?");
    } 
    if (localStorage.getItem("deletingMovieByManagerCurrentUserId")) {
        handleMyRatedMovies(localStorage.getItem("currentUserId"));
        // console.log(localStorage.getItem("currentUserEmail"))
        // console.log(localStorage.getItem("currentUserId"))
        setCurrentUserId(localStorage.getItem("currentUserId"))
        setCurrentUserEmail(localStorage.getItem("currentUserEmail"))
        localStorage.removeItem("deletingMovieByManagerCurrentUserId");
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("currentUserEmail");
             setSnack ('success', 'Manager, the movie deleted'
        ); 
    }
  }, []);

// const handleShow = (movie) => {
//   navigate(`${ROUTES.MOVIE_INFO}/${movie.release_date+movie.overview}`)
//   localStorage.removeItem("release_date")
//   localStorage.removeItem("overview")
//   localStorage.removeItem("API_IMG")
//   localStorage.removeItem("poster_path")
//   localStorage.removeItem("title")
//   localStorage.removeItem("original_language")
//   localStorage.removeItem("vote_average")
//   localStorage.removeItem("comeFromRatePage")

//   localStorage.setItem("release_date", `${movie.release_date}`)
//   localStorage.setItem("overview", `${movie.overview}`)
//   localStorage.setItem("API_IMG", `${movie.API_IMG}`)
//   localStorage.setItem("poster_path", `${movie.poster_path}`)
//   localStorage.setItem("title", `${movie.title}`)
//   localStorage.setItem("original_language", `${movie.original_language}`)
//   localStorage.setItem("vote_average", `${movie.vote_average}`)
//   localStorage.setItem("comeFromRatePage", "YES")
// }  

const editRateMovie = (movie) => {
let objToDb = {
    _id: movie._id,
    title: movie.title,
    grade: value,
    overview: movie.overview,
    original_language: movie.original_language,
    API_IMG: movie.API_IMG,
    release_date: movie.release_date,
    user_id: movie.user_id,
    __v: movie.__v
  }
      handleEditMovieRate(objToDb) 
}  

const unableBtn = () => {
      setBtn(1)
}  

if (!user) {
  return (
    <Typography variant="h1">Please LogIn !!!</Typography>
  )
}


let counter = 0
if (movies) {
  // console.log(movies)
  for (let i in movies) {
    counter++
}

  if (counter == 0) {
    return (
      <Container sx={{mt: "50px", mb: "200px"}}>
      <PageHeader
        title="Manager, Here you can delete this User Votes"
        subtitle=""
      />
         <PageHeader
        title=""
        subtitle="No movies here, yet....."
      />
      </Container>
    )
  } else if (counter > 0) {
    return (
<Container sx={{mt: "50px", mb: "200px"}}> 

<PageHeader
        title="Manager, Here you can delete this User Votes" 
        subtitle=""
      />
      <Divider sx={{ my: 2 }} align="center" />
      <Typography align="center" variant="h5">USER ID: {currentUserId}</Typography>
      <Typography align="center" variant="h5">USER EMAIL: {currentUserEmail}</Typography>
      <Divider sx={{ my: 2 }} align="center" />
      <Divider sx={{ my: 2 }} align="center" />
      {/* <StarIcon></StarIcon> */} 
<Grid sx={{ width: '100%', textAlign: 'center'}}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
      {movies.map((movieReq, i)=>
            <Grid item  key={i} >
                      <Container>
        <div>
        <div className="card text-center bg-secondary mb-3">
        {/* <Button type="button" className="btn btn-dark" onClick={(e) => handleShow(movieReq)} >View More Details</Button> */}
            <div className="card-body">
              <img className="card-img-top" src={movieReq.API_IMG} width="200px" />
              <div className="card-body">
              </div>
            </div>
        </div>
        </div>
        </Container>
        <Rating name="customized-10" defaultValue={movieReq.grade} max={10} onChange={
          (event, newValue) => 
          {setValue(newValue)}
        }
        onClick={unableBtn}
           />
        <Container><Button disabled={!btn} type="button" className="btn btn-dark" onClick={(e) => editRateMovie(movieReq)} >Edit Rate</Button></Container>
        <Container><Button color="error" type="button" className="btn btn-red" onClick={
          () => deleteMovie(movieReq)
          } >Delete movie</Button></Container>
            </Grid>
            )
            }
      </Grid>
</Grid>
</Container>
  );
}
}
};


export default RatedMovUserForManager;
