import { Container, Typography, Grid, Button } from "@mui/material";
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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


const GeneralRatePage = (userId, title, poster_path, vote_average, release_date, overview, original_language, API_IMG) => {

  const { pending, error, movies, handleGetMovies, handleMyRatedMovies, handleDeleteMovie, handleAllMovies} = useMovies();
  const [query, setQuery]=useState('');
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [moviesToShow, setoviesToShow] = useState([]);

  const navigate = useNavigate();
  const [spacing, setSpacing] = React.useState(2);
  const {user} = useUser ();
  const {setSnack} = useSnack ();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value)); 
  };

//   const handleEditRate = () => {
//    console.log("casi")
//   };

//   const deleteMovie = (movie) => {  
// //  console.log(movies) 
//     localStorage.setItem("deletingMovie", "Yes")  
//     navigate (ROUTES.MOVIES)
//     handleDeleteMovie(movie)
//     // window.location.reload(true);
//   };

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
const [render, setRender] = useState("")

// const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("?changeVotes?", "YES")) {
        localStorage.removeItem("?changeVotes?");
        navigate(ROUTES.USERS_PAGE)
    }
    if (localStorage.getItem("deletedMovie", "Yes")) {
        localStorage.removeItem("deletedMovie");
        setSnack ('success', 'The movie deleted'); 
    }
    if (user) {
        handleAllMovies(user._id)
        // handleMyRatedMovies(user._id);
    }
  }, []);

const handleShow = (movie) => {
  navigate(`${ROUTES.MOVIE_INFO}/${movie.release_date+movie.overview}`)
  localStorage.removeItem("release_date")
  localStorage.removeItem("overview")
  localStorage.removeItem("API_IMG")
  localStorage.removeItem("poster_path")
  localStorage.removeItem("title")
  localStorage.removeItem("original_language")
  localStorage.removeItem("vote_average")
  localStorage.removeItem("comeFromRatePage")
  
  localStorage.setItem("release_date", `${movie.release_date}`)
  localStorage.setItem("overview", `${movie.overview}`)
  localStorage.setItem("API_IMG", `${movie.API_IMG}`)
  localStorage.setItem("poster_path", `${movie.poster_path}`)
  localStorage.setItem("title", `${movie.title}`)
  localStorage.setItem("original_language", `${movie.original_language}`)
  localStorage.setItem("vote_average", `${movie.vote_average}`)
  localStorage.setItem("comeFromRatePage", "YES")
}  
// const removeItem = (arr, item) => {
//       let newArray = [...arr]
//       const index = newArray.findIndex((element) => element === item)
//       if (index !== -1) {
//         newArray.splice(index, 1)
//         return newArray
//       }
// }

if (!user) {
  return (
    <Typography variant="h1">Please LogIn !!!</Typography>
  )
}

let counter = 0
if (movies) {

for (let i in movies) {
     counter++
}

let oneMovieData = []
let oneMovieDataPharse = []
for (let movie of movies) {
     if (!oneMovieData.includes(`${JSON.stringify(movie.title)}+${JSON.stringify(movie.API_IMG)}`)) {
          oneMovieData.push(`${JSON.stringify(movie.title)}+${JSON.stringify(movie.API_IMG)}`) 
          oneMovieDataPharse.push({
            title: movie.title,
            API_IMG: movie.API_IMG
          })
     } 
}

let countPoint = []
let sumCountPoint = []
for (let movie of oneMovieDataPharse) {
     for (let i in movies) {
          if ((movies[i].API_IMG == movie.API_IMG)&&!countPoint.includes(JSON.stringify({
            title: movies[i].title,
            img: movies[i].API_IMG,
})))      {
               countPoint.push(JSON.stringify({
                            title: movies[i].title,
                            img: movies[i].API_IMG,
               }))
               sumCountPoint.push({
                                   title: movies[i].title,
                                   img: movies[i].API_IMG,
                                   totalScore: [movies[i].grade]
               })
          } 
          else if ((movies[i].API_IMG == movie.API_IMG)&&countPoint.includes(JSON.stringify({
            title: movies[i].title,
            img: movies[i].API_IMG,
})))      {
               for (let movi of sumCountPoint) {
                    if (movi.title == movies[i].title) {
                        movi.totalScore.push(movies[i].grade)
                    }
               }
          }
     }
}

let sumPoints = []
let sumy = []
let scoreCounter = 0
for (let movie of sumCountPoint) {
     scoreCounter = 0
     for (let i of movie.totalScore) {
          scoreCounter = scoreCounter + i
     }
     sumPoints.push({
                     title: movie.title,
                     API_IMG: movie.img,
                     totalScore: scoreCounter
     })
     sumy.push({
                     title: movie.title,
                     API_IMG: movie.img,
                     totalScore: scoreCounter
     })
}
let sum = sumPoints

let referance = 0
let inx = 0
let counterr = 0
let finals = []
for (let i of sum) {
     referance = 0
    for (let j in sumy) {
        if (sumy[j].totalScore > referance) {
            referance = sumy[j].totalScore
            inx = j
        }
    }
     let movieObj = {
      title: sumy[sumy.indexOf(sumy[inx])].title,
      API_IMG: sumy[sumy.indexOf(sumy[inx])].API_IMG,
      totalScore: sumy[sumy.indexOf(sumy[inx])].totalScore,
      winnerNumber: counterr
    }
     finals.push(movieObj)
     // finals.push(sumy[sumy.indexOf(sumy[inx])])
     sumy.splice(sumy.indexOf(sumy[inx]), 1)
     counterr++
}

if (counter == 0) {
    return (
      <Container sx={{mt: "50px", mb: "200px"}}>
      <PageHeader
        title="No movies here:"
        subtitle=""
      />
      </Container>
    )
  } else {
    return (
<Container sx={{mt: "50px", mb: "200px"}}>

<PageHeader
        title="And the winners are:"
        subtitle=""
      />
<Container>
{/* <EmojiEventsIcon></EmojiEventsIcon> */}
</Container>
<Grid sx={{ width: '100%', textAlign: 'center'}}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
      {finals.map((movieReq, i)=>
            <Grid item  key={i} >
      <Container> 
        <h3>Place number: {movieReq.winnerNumber+1}</h3>
      <Container> 
        <div>
        <div className="card text-center bg-secondary mb-3">
            <div className="card-body">
              <img className="card-img-top" src={movieReq.API_IMG} width="150px" />
              <h3>Total score: {movieReq.totalScore}</h3>
              <div className="card-body">
              </div>
            </div>
        </div>
        </div>
      </Container>
      </Container>
            </Grid>
            )
            }
      </Grid>
</Grid>
</Container>
    )
  }
}
};

export default GeneralRatePage;
