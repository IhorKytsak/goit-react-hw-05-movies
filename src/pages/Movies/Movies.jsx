import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { getMovieByQuery } from 'utils/movieApi';
import SearchForm from 'components/SearchForm/SearchForm';
import Loader from 'components/Loader/Loader';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useSearchParams();

  const query = searchQuery.get('query');

  const location = useLocation();

  useEffect(() => {
    const fetchSearchMovies = async () => {
      setIsLoading(true);

      const movies = await getMovieByQuery(query);
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

    if (query) {
      fetchSearchMovies();
    }
  }, [query]);

  const searchMoviesHandler = query => {
    if (searchQuery !== query) {
      setMovies([]);
    }

    setSearchQuery({ query });
  };

  return (
    <div>
      <SearchForm showMovies={searchMoviesHandler} />
      {isLoading && <Loader />}
      {!isLoading && movies.length === 0 && query && <p>Not found!</p>}
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
