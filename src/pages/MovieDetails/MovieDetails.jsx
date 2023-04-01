import { useEffect, useState, Suspense } from 'react';
import { NavLink, useParams, useLocation, Outlet } from 'react-router-dom';

import BackButton from 'components/BackButton/BackButton';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { getMovieById } from 'utils/movieApi';
import { getImgUrl } from 'utils/getImgUrl';

import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const location = useLocation();
  const backUrl = location?.state?.from ?? '/';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);

        const movieData = await getMovieById(movieId);

        const imgUrl = getImgUrl(movieData.poster_path);
        movieData.imgUrl = imgUrl;

        setMovieData(movieData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const movieTitle = `${movieData.title} - ${new Date(
    movieData.release_date
  ).getFullYear()}`;

  const userScore = `User Score: (${Math.round(movieData.vote_average * 10)}%)`;

  const genresNames =
    movieData.genres && movieData.genres.length > 0
      ? movieData.genres.map(genre => genre.name).join(' ')
      : 'unknown';

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BackButton to={backUrl} />

      <div className={styles.movieWrapper}>
        <img
          className={styles.movieImg}
          src={movieData.imgUrl}
          alt={movieData.title}
        />
        <div className={styles.movieInfo}>
          <h1>{movieTitle}</h1>
          <p>{userScore}</p>
          <div className={styles.movieInfoWithTitle}>
            <h3>Overview</h3>
            <p>{movieData.overview}</p>
          </div>
          <div className={styles.movieInfoWithTitle}>
            <h4>Genres</h4>
            <p>{genresNames}</p>
          </div>
        </div>
      </div>

      <div className={styles.additionalInfoWrapper}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink to={'cast'} state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to={'reviews'} state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
