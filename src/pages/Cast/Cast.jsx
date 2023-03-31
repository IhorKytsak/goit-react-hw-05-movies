import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieCast } from 'utils/movieApi';
import { getImgUrl } from 'utils/getImgUrl';
import CastList from 'components/CastList/CastList';
import Loader from 'components/Loader';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ferchMovieCast = async () => {
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
      setIsLoading(false);
    };

    ferchMovieCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {cast.length === 0 && !isLoading ? (
        <p>Unfortunately no cast was found.</p>
      ) : (
        <CastList cast={cast} />
      )}
    </>
  );
};

export default Cast;
