import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';

import styles from './SearchForm.module.css';

const SearchForm = ({ onSearchMovies }) => {
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery === '') {
      return;
    }

    onSearchMovies(searchQuery);
    form.reset();
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
  onSearchMovies: PropTypes.func.isRequired,
};

export default SearchForm;
