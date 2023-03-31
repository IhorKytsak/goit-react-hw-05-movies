import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return <h3 className="message">Error: {message}</h3>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
