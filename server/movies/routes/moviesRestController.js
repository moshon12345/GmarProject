const express = require("express");
const auth = require("../../auth/authService");
const protectServer = require("../../auth/Providers/protectServer");
const { handleError } = require("../../utils/handleErrors");
const {
  createMovie,
  deleteMovie,
  getMyRatedMovies,
  getAllMovies,
  editMovieRate,
  getManagerRatedMovies,
  deleteMovieByManager,
} = require("../models/moviesAccessDataService");
const router = express.Router();

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=822261ab844352e46049dc0b63b315b5";
// const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=822261ab844352e46049dc0b63b315b5&query";

// let moviesArray = []
router.get("/",protectServer, async (req, res) => {
  // moviesArray = []
// router.get("/", protectServer, async (req, res) => {
  try {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      return res.send(data.results);
    })
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// let moviesArray = []
// router.get("/", async (req, res) => {
//   moviesArray = []
// // router.get("/", protectServer, async (req, res) => {
//   try {
//     fetch(API_URL)
//     .then((res)=>res.json())
//     .then(data=>{
//       moviesArray.push(data.results)
//       // return res.send(data.results);
//     })
 
//     const movies = await getManagerRatedMovies();
//     moviesArray.push(movies)
//     return res.send(moviesArray);

//   } catch (error) {
//     return handleError(res, error.status || 500, error.message);
//   }

  // try {
  //   // const { id } = req.params;
  //   const movies = await getManagerRatedMovies();
  //   moviesArray.push(movies)
  //   return res.send(moviesArray);
  // } catch (error) {
  //   return handleError(res, error.status || 500, error.message);
  // }

// });

router.put("/search/:text",protectServer, async (req, res) => {
  // console.log(req.params.text)
  try {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${req.params.text}`)
    .then((res)=>res.json())
    .then(data=>{
      return res.send(data.results);
    })
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/vote",protectServer, async (req, res) => {
  let movie = req.body[0]
  let userId = req.body[1]
  try {
    movie = await createMovie(movie, userId);
    return res.status(201).send(movie);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/delete",protectServer, async (req, res) => { 
  try {
    const movies = await deleteMovie(req.body);
    return res.send(movies);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/deleteByManager",protectServer, async (req, res) => {
  try {
    const movies = await deleteMovieByManager(req.body);
    return res.send(movies);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/all-movies/:userId",auth, async (req, res) => { 
  try {
    const movies = await getAllMovies(req.params.userId) 
    return res.send(movies);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:ratedManager",protectServer, async (req, res) => { 
  try {
    // const { id } = req.params;
    const movies = await getManagerRatedMovies();
    return res.send(movies);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:rated", async (req, res) => { 
  try {
    const { id } = req.params;
    const movies = await getMyRatedMovies(req.body.user_id);
    return res.send(movies);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/editrated",protectServer, async (req, res) => { 
  // console.log("fi")
  // console.log(req.body)
  try {
    const { id } = req.params;
    const movies = await editMovieRate(req.body);
    return res.send(movies);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/allMovies",protectServer, async (req, res) => {  
  console.log("Hello")
  // try { 
  //   const { id } = req.params;
  //   const movies = await getMyRatedMovies(req.body.user_id);
  //   return res.send(movies);
  // } catch (error) {
  //   return handleError(res, error.status || 500, error.message);
  // }
});

module.exports = router;
