import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from 'components/Loader';

const AppRouter = () => {
  const Home = lazy(() => import('pages/Home/Home'));
  const Movies = lazy(() => import('pages/Movies/Movies'));
  const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
  const Cast = lazy(() => import('pages/Cast/Cast'));
  const Reviews = lazy(() => import('pages/Reviews/Reviews'));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
