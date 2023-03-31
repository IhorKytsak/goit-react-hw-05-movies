import PropTypes from 'prop-types';

import styles from './CastList.module.css';

const CastList = ({ cast }) => {
  return (
    <ul className={styles.castList}>
      {cast.map(actor => {
        return (
          <li key={actor.id}>
            <img src={actor.imgUrl} alt={actor.name} />
            <div>
              <h4>{actor.name}</h4>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

CastList.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};

export default CastList;
