import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8181';
const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=822261ab844352e46049dc0b63b315b5";
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=822261ab844352e46049dc0b63b315b5&query";

export const getMovies = async () => {
  try {
    const {data} = await axios.get (`${apiUrl}/movies`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const getMyRatedMovies = async (user_id) => {
  try {
    const {data} = await axios.put (`${apiUrl}/movies/rated`, {user_id});
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const getManagerRatedMovies = async () => {
  try {
    const {data} = await axios.get (`${apiUrl}/movies/ratedManager`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.message);
  }
};
 
export const editMyMovieRate = async (movie) => { 
  try {
    const {data} = await axios.post (`${apiUrl}/movies/editrated`, {movie});
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const deleteMovie = async (movie) => {
  try {
    const {data} = await axios.put (`${apiUrl}/movies/delete`, {movie});
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const deleteMovieByManager = async (movie) => {
  try {
    const {data} = await axios.put (`${apiUrl}/movies/deleteByManager`, {movie});
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.message);
  }
};

let movieOfSearch = []
export const getMoviesSearch = async (e) => {
if (e) {
  try {
    movieOfSearch = []
    const {data} = await axios.put (`${apiUrl}/movies/search/${e}`);
    for (let i in data) {
          if (JSON.stringify(data[i].title).toLocaleLowerCase().includes(e.toLocaleLowerCase())) {
            movieOfSearch.push(data[i])
            // console.log()
        }
      }
    return Promise.resolve(movieOfSearch);
  } catch (error) {
    return Promise.reject (error.message);
  } 
}
};

export const voteMovie = async (movie, userId) => {
  try {
    const {data} = await axios.put (`${apiUrl}/movies/vote`, [movie, userId]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const getAllMovies = async (userId) => { 
  try {
    const {data} = await axios.get (`${apiUrl}/movies/all-movies/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};
