import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '9f418ce48484288694da4da227268766';

export const getMovieByQuery = async request => {
  const response = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${request}`
  );
  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const getMovieById = async id => {
  const response = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieCast = async id => {
  const response = await axios.get(`/movie/${id}/credits?api_key=${API_KEY}`);
  return response.data.cast;
};

export const getMovieReviews = async id => {
  const response = await axios.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
  return response.data.results;
};
