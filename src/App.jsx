import Header from 'components/Header/Header';
import AppRouter from 'routes/AppRouter';

import styles from './App.module.css';

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <AppRouter />
      </div>
    </>
  );
};

export default App;
