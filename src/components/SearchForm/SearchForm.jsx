import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';

import styles from './SearchForm.module.css';

const SearchForm = ({ showMovies }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value;

    if (searchQuery.trim() === '') {
      return;
    }

    showMovies(searchQuery);
    e.target.reset();
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit}>
      <input type="text" name="query" autoComplete="off" required />
      <button>
        <BiSearchAlt />
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  showMovies: PropTypes.func,
};

export default SearchForm;
