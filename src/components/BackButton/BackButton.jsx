import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import styles from './BackButton.module.css';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.backBtn}
      type="button"
      onClick={() => {
        navigate(to);
      }}
    >
      <HiOutlineArrowNarrowLeft size={30} />
      Go back
    </button>
  );
};

BackButton.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
    }),
  ]).isRequired,
};

export default BackButton;
