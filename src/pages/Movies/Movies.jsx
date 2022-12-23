import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getMovieByQuery } from 'utils/movieApi';
import SearchForm from 'components/SearchForm/SearchForm';
import Loader from 'components/Loader/Loader';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  useEffect(() => {
    const fetchSearchMovies = async () => {
      setIsLoading(true);

      if (searchQuery.trim() === '') {
        setIsLoading(false);
        return;
      }

      const movies = await getMovieByQuery(searchQuery);

      const modifaedMovies = movies.results.map(
        ({ id, title, poster_path, vote_average, release_date }) => ({
          id,
          title,
          poster_path,
          vote_average,
          release_date,
        })
      );

      setMovies(modifaedMovies);

      setIsLoading(false);
    };

    fetchSearchMovies();
  }, [searchQuery]);

  const searchMoviesHandler = query => {
    if (searchQuery === query) {
      return;
    }

    setSearchQuery(query);
    setMovies([]);
  };

  return (
    <div>
      <SearchForm showMovies={searchMoviesHandler} />
      {isLoading && <Loader />}
      {!isLoading && movies.length === 0 && searchQuery && <p>Not found!</p>}
      {!isLoading && movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
