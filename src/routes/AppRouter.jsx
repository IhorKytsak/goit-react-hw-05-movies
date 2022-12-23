import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import Home from 'pages/Home/Home';

const AppRouter = () => {
  const Movies = lazy(() => import('pages/Movies/Movies'));
  const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
  const Cast = lazy(() => import('pages/Cast/Cast'));
  const Reviews = lazy(() => import('pages/Reviews/Reviews'));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Movies />} path="movies" />
        <Route element={<MovieDetails />} path="movies/:movieId">
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
