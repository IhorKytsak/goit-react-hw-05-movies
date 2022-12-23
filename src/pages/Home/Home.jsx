import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import { getTrendingMovies } from 'utils/movieApi';

import styles from './Home.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);

      const movies = await getTrendingMovies();
      const formatedMovies = movies.map(({ id, title, poster_path }) => ({
        id,
        title,
        poster_path,
      }));

      setTrendingMovies(formatedMovies);
      setIsLoading(false);
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Trending today</h1>
      {isLoading && <Loader />}
      {!isLoading && (
        <ul>
          {trendingMovies.map(movie => (
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

export default Home;
