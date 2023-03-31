import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import MoviesList from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { getMovieByQuery } from 'utils/movieApi';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query');

  useEffect(() => {
    const controller = new AbortController();
    const fetchSearchMovies = async () => {
      try {
        setIsLoading(true);

        const movies = await getMovieByQuery(queryParam, controller.signal);
        const modifaedMovies = movies.results.map(({ id, title }) => ({
          id,
          title,
        }));

        setMovies(modifaedMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (queryParam) {
      fetchSearchMovies();
    }

    return () => {
      controller.abort();
    };
  }, [queryParam]);

  const searchMoviesHandler = query => {
    if (query !== queryParam) {
      setMovies([]);
    }

    setSearchParams({ query });
  };

  if (error && error !== 'canceled') {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <SearchForm onSearchMovies={searchMoviesHandler} />
      {isLoading ? <Loader /> : <MoviesList movies={movies} />}
    </div>
  );
};

export default Movies;
