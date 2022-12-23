import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import styles from './BackButton.module.css';

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      className={styles.backBtn}
      type="button"
      onClick={() => {
        navigate(location?.state?.from ?? '/');
      }}
    >
      <HiOutlineArrowNarrowLeft size={30} />
      Go back
    </button>
  );
};

export default BackButton;
