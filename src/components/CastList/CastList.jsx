import PropTypes from 'prop-types';

import styles from './CastList.module.css';

const CastList = ({ actors }) => {
  return (
    <ul className={styles.castList}>
      {actors.map(actor => {
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
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CastList;
