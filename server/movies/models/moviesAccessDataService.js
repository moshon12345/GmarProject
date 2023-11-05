const Movie = require("./mongodb/Movie");
const { handleBadRequest } = require("../../utils/handleErrors");
const User = require("../../users/models/mongodb/User");
const protectServer = require("../../auth/Providers/protectServer");
const Protect = require("./mongodb/Protect");
const mongoose = require("mongoose");

const DB = process.env.DB || "MONGODB";

const proty = async userId => { 
  // console.log(userId)
// let user = await User.findById(userId);

  let currentTime = new Date();
  // console.log(userId)
  if (DB === "MONGODB") {
    try {
      // let user = await Protect.findById(userId);
      // let user = await Protect.find({userId: userId})
      // let users = await Protect.find()
      let user = await User.findById(userId);
      if (user) {
        // console.log(user.isUserSourceAdmin)
        // console.log(user.acceptedCallPerDay)
        // console.log((user.dateOfStartCounting).getTime())
        // console.log((user.lastCallOfUser).getTime())
        // console.log(user.numbersOfCallsInLast24H)
      }

      
      // if (users) {
      //     for (let user of users) {
      //          console.log(user[0].user_id) 
      //     }
      // }


    //   if (!user.length) { 
    //     await mongoose.connect('mongodb://127.0.0.1/business_movie_app');
    //     await Protect.collection.insertOne({ 
    //       user_id: userId,
    //       numbersOfCalls: 0,
    //       currentTimeCall: currentTime
    //     });
    //     console.log("Data Created")
    //     return
    //   } else {
    //     // console.log(user)
    //     console.log("Data is allready here")
    //     // console.log(user)
    //     // console.log(user[0]._id) 
    //     await mongoose.connect('mongodb://127.0.0.1/business_movie_app');
    //     let userToChange = await Protect.findByIdAndUpdate(user[0]._id, {
    //         user_id: userId,
    //         numbersOfCalls: user[0].numbersOfCalls + 1,
    //         currentTimeCall: user[0].currentTimeCall

    //     }, 
    //     {
    //     new: true,
    // });
    //       return Promise.resolve(userToChange);
    //     // user.numbersOfCalls = user.numbersOfCalls + 1
    //   }
    //   // console.log(user)
    //   // movie = await Movie.findByIdAndDelete(movieId);

    //   // return Promise.resolve(userToChange);




    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("movie deleted not in mongodb");
}

const getAllMovies = async (userId) => {  
  let movies = await Movie.find();
  if (DB === "MONGODB") {
    try {
      proty(userId)
      proty("getAllMovies") 
      let movies = await Movie.find();
      return Promise.resolve(movies);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get movie not in mongodb");
};

let getMyRatedMoviesArry = []
const getMyRatedMovies = async user_id => {
  getMyRatedMoviesArry = []
  if (DB === "MONGODB") {
    try {
      // proty(user_id) 
      // proty("getMyRatedMovies") 
      let movieCheck = await Movie.find();
      for (let movie of movieCheck) {
           if (movie.user_id == user_id) 
           getMyRatedMoviesArry.push(movie)
      }
      return Promise.resolve(getMyRatedMoviesArry); 
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get movie not in mongodb");
};

let getManagerRatedMoviesArry = [] 
const getManagerRatedMovies = async () => { 
  getManagerRatedMoviesArry = []
  if (DB === "MONGODB") {
    try {
      
      let movieCheck = await Movie.find();
      for (let movie of movieCheck) {
           if (movie.userIsAdmin == true) 
           getManagerRatedMoviesArry.push(movie)
      }
      // console.log(getManagerRatedMoviesArry) 
      return Promise.resolve(getManagerRatedMoviesArry); 
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get movie not in mongodb");
};

const editMovieRate = async movie => { 
  // console.log(movie.movie.user_id)
  // console.log(movie.movie._id)
  // console.log("pst")
  if (DB === "MONGODB") { 
    try {
      // proty(movie.movie.user_id) 
      let mov = await Movie.findByIdAndUpdate(movie.movie._id, movie.movie, {
        new: true,
      });

      if (!mov)
      throw new Error("A movie with this ID cannot be found in the database");
      return Promise.resolve("Movie grade updated"); 
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("movie movie not in mongodb");
};

const createMovie = async (movieForDB, userId) => {
  let isUserVotedThisMovie = false
  if (DB === "MONGODB") {
    try {
      // proty(userId) 
      let counterOfVotes = 0 
      let currentUserAcceptedVotes = 0
      const users = await User.find({}, { password: 0, __v: 0 });
      for (let user in users) {
       if (users[user]._id == userId) {
           currentUserAcceptedVotes = currentUserAcceptedVotes+users[user].acceptedVotes
       }
    }
      
      let movieCheck = await Movie.find();
      // console.log(movieCheck)
      for (let movieUser in movieCheck) {
      if ((movieCheck[movieUser].user_id) == ((movieForDB.user_id))) {
           counterOfVotes++
          //  console.log(movieCheck[movieUser])
        }
      }
      if (currentUserAcceptedVotes <= counterOfVotes) {
          return Promise.resolve("You reach the limid of votes, talk with the managet");
      }
          //  console.log(counterOfVotes)
      for (let movie in movieCheck) {
        // console.log(movieCheck[movie].API_IMG)
        // console.log(movieForDB.API_IMG)
        // console.log(movieCheck[movie].user_id)
        // console.log(movieForDB.user_id)
      
        if (
          (movieCheck[movie].API_IMG).toLocaleLowerCase() == ((movieForDB.API_IMG).toLocaleLowerCase())&&
          (movieCheck[movie].user_id) == ((movieForDB.user_id))
          ) {
            // console.log("You SEE !?");
            isUserVotedThisMovie = true;
          } 
      }
      if (isUserVotedThisMovie == true) {
        return Promise.resolve("You allready make you Vote about this movie");
      } else {
        let movie = new Movie(movieForDB);
        movie = await movie.save();
        return Promise.resolve(movie);
      }
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("createMovie movie not in mongodb");
};

const deleteMovie = async (moviemov) => {
  let counter = 0
  let movieId = moviemov.movie._id
  // let movieUserId = moviemov.movie._id
  if (DB === "MONGODB") { 
    try {
      // proty(moviemov.movie.user_id) 
      let allMoviesFromDb = await Movie.find();
      for (let mov in allMoviesFromDb) {
           if (allMoviesFromDb[mov].userIsAdmin == true) {
               counter++
           }
      }
      if (counter <= 3 && (moviemov.movie.userIsAdmin == true)) {
          return Promise.resolve("Dear manager, you need at least 3 movies in your rates, (These are the instructions of the college)");
      }
      let movie = await Movie.findById(movieId);
      if (!movie)
        throw new Error("A movie with this ID cannot be found in the database");

      movie = await Movie.findByIdAndDelete(movieId);

      return Promise.resolve(movie);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("movie deleted not in mongodb");
};

const deleteMovieByManager = async (movie) => { 
  let movieId = movie.movie._id
  if (DB === "MONGODB") { 
    try {
      let movie = await Movie.findById(movieId);

      if (!movie)
        throw new Error("A movie with this ID cannot be found in the database");

      movie = await Movie.findByIdAndDelete(movieId);

      return Promise.resolve(movie);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("movie deleted not in mongodb");
};

exports.deleteMovie = deleteMovie;
exports.deleteMovieByManager = deleteMovieByManager;
exports.editMovieRate = editMovieRate;
exports.getAllMovies = getAllMovies;
exports.createMovie = createMovie;
exports.getMyRatedMovies = getMyRatedMovies;
exports.getManagerRatedMovies = getManagerRatedMovies;
