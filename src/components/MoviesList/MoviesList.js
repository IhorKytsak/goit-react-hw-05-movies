import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  if (!movies) {
    return;
  }

  if (movies.length === 0) {
    return <p className="message">Not found!</p>;
  }

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li className={styles.listItem} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default MoviesList;
