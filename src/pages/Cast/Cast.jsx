import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieCast } from 'utils/movieApi';
import { getImgUrl } from 'utils/getImgUrl';
import CastList from 'components/CastList/CastList';
import Loader from 'components/Loader/Loader';

const Cast = () => {
  const { movieId } = useParams();

  const [actors, setActors] = useState([]);
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

      setActors(formatedMovieCast);
      setIsLoading(false);
    };

    ferchMovieCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {actors.length === 0 && !isLoading ? (
        <p>Unfortunately no actors was found.</p>
      ) : (
        <CastList actors={actors} />
      )}
    </>
  );
};

export default Cast;
