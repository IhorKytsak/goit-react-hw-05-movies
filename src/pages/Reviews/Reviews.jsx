import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../utils/movieApi';
import Loader from 'components/Loader/Loader';

import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);

      const reviews = await getMovieReviews(movieId);

      const formatedReviews = reviews.map(({ author, content, id }) => ({
        author,
        content,
        id,
      }));

      setReviews(formatedReviews);
      setIsLoading(false);
    };

    fetchReviews();
  }, [movieId]);

  const reviewsList = (
    <ul className={styles.reviewsList}>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );

  const emptyList = <p>We don't have any reviews for this movie yet.</p>;

  return (
    <>
      {isLoading && <Loader />}
      {reviews.length === 0 && !isLoading ? emptyList : reviewsList}
    </>
  );
};

export default Reviews;
