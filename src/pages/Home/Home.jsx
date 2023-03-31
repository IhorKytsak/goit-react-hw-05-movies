import { useEffect, useState } from 'react';

import MoviesList from 'components/MoviesList/MoviesList';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { getTrendingMovies } from 'utils/movieApi';

import styles from './Home.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);

        const movies = await getTrendingMovies();
        const formatedMovies = movies.map(({ id, title }) => ({
          id,
          title,
        }));

        setTrendingMovies(formatedMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className={styles.title}>Trending today</h1>

      <MoviesList movies={trendingMovies} />
    </div>
  );
};

export default Home;
