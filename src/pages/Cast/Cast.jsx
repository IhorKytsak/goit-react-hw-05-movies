import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieCast } from 'utils/movieApi';
import { getImgUrl } from 'utils/getImgUrl';
import CastList from 'components/CastList/CastList';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ferchMovieCast = async () => {
      try {
        setIsLoading(true);

        const movieCast = await getMovieCast(movieId);
        const formatedMovieCast = movieCast.map(
          ({ name, profile_path, character, id }) => ({
            name,
            id,
            character,
            imgUrl: getImgUrl(profile_path),
          })
        );

        setCast(formatedMovieCast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    ferchMovieCast();
  }, [movieId]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {cast.length === 0 ? (
        <p>Unfortunately no cast was found.</p>
      ) : (
        <CastList cast={cast} />
      )}
    </>
  );
};

export default Cast;
