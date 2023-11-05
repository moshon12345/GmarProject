import {useCallback, useState} from 'react';
import {
        getMoviesSearch,
        voteMovie,
        deleteMovie,
        getMyRatedMovies,
        getAllMovies,
        editMyMovieRate,
        getMovies,
        getManagerRatedMovies,
        deleteMovieByManager
      } from '../services/movieService';
import useAxios from '../../hooks/useAxios';
import {useSnack} from '../../providers/SnackbarProvider';
import {useNavigate} from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

const useMovies = () => {
  const [movies, setMovies] = useState (null);
  const [moviesManager, setMoviesManager] = useState (null);
  const [movie, setMovie] = useState (null);
  const [error, setError] = useState (null);
  const [pending, setPending] = useState (false);
  useAxios ();

  const {setSnack} = useSnack ();
  const navigate = useNavigate ();

  const requestStatusMovies = (pending, error, movies, movie, moviesManager) => {
    setPending (pending);
    setError (error);
    setMoviesManager (moviesManager);
    setMovies (movies);
    setMovie (movie);
  };

  const handleGetMovies = async (e) => {
    try {
      setPending (true);
      const movies = await getMovies ();
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleAllMovies = async (userId) => { 
    try {
      setPending (true); 
      const movies = await getAllMovies (userId); 
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleDeleteMovie = async (movie) => {  
    try {
      setPending (true);
      const movies = await deleteMovie (movie);   
      if (movies == "Dear manager, you need at least 3 movies in your rates, (These are the instructions of the college)") {
          localStorage.removeItem("deletedMovie");
          setSnack ('error', 'Dear manager, you need at least 3 movies in your rates, (These are the instructions of the college)'
          ); 
          return
      }
      navigate (ROUTES.RATE_MOVIES)
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleDeleteMovieByManager = async (movie) => {
    try {
      setPending (true);
      const movies = await deleteMovieByManager (movie); 
      navigate (ROUTES.USERS_PAGE)
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleMyRatedMovies = async (user_id) => {

    try {
      setPending (true);
      const movies = await getMyRatedMovies (user_id);
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  //   //   //   //   //   //   //   //   //   //    //   // 
  const handleManagerRatedMovies = async () => {
    try {
      setPending (true);
      const movies = await getManagerRatedMovies();
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
let finalsOfManager = []
let countIt = 0
for (let i = 0; i < finals.length; i++) {  
  if (countIt >= 5 && localStorage.getItem("^finals!^_manager!^")) {
      break;
  }
    finalsOfManager.push(finals[i])
    countIt++
}
    localStorage.removeItem("^finals!^_manager!^");   
    let oldItems = JSON.parse(localStorage.getItem("^finals!^_manager!^")) || [];
    oldItems.push(finalsOfManager);
    localStorage.setItem("^finals!^_manager!^", JSON.stringify(oldItems));
}
      // requestStatusMovies (false, null, moviesManager, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
  }
};

  const handleEditMovieRate = async (movie) => {
    try {
      setPending (true);
      const movies = await editMyMovieRate (movie);
      if (movies == "Movie grade updated")
       setSnack ('success', 'Movie grade updated'
        ); 
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleGetMoviesSearch = async (id) => {
    try {
      setPending (true);
      const movies = await getMoviesSearch (id);
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleGetMoviesSearchDetailsPage = async (id) => {
    try {
      setPending (true);
      const movies = await getMoviesSearch (id);
      requestStatusMovies (false, null, movies, null);
    } catch (error) {
      requestStatusMovies (false, error, null, null);
    }
  };

  const handleVoteMovie = async (movie, userId) => { 
    try {
      setPending (true);
      const movies = await voteMovie (movie, userId);
      if (movies == "You allready make you Vote about this movie") {
        setSnack ('error', 'You allready make you Vote about this movie, You can edit your Vote in your "My Rates Page"'
        );
      }
      if (movies == "You reach the limid of votes, talk with the managet") {
        setSnack ('error', 'You reached the limit of votes, talk with the managet to open your limits'
        );
      }
      if ((movies.title).toLocaleLowerCase() == (movie.title).toLocaleLowerCase()) {
           setSnack ('success', 'Congratulations, your vote has been successfully received. The movie will appear in "My Rates Page""'
        ); 
      }
        requestStatusMovies (false, null, movies, null);
      } catch (error) {
        requestStatusMovies (false, error, null, null);
    }
  };

  return {
    handleGetMovies,
    handleGetMoviesSearch,
    handleGetMoviesSearchDetailsPage,
    handleVoteMovie,
    handleMyRatedMovies,
    handleManagerRatedMovies,
    handleAllMovies,
    handleDeleteMovie,
    handleDeleteMovieByManager,
    handleEditMovieRate,
    moviesManager,
    movies,
    pending,
    error,
  };
};

export default useMovies;
