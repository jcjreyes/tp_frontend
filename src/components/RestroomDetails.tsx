import { Restrooms } from '../api/requests/Restrooms';
import AddReview from './AddReview';
import Review from './Review';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function RestroomDetails({ restroom }) {
  const {
    data: details,
    isLoading,
    isError,
  } = useQuery(['restroom', restroom?.id], () =>
    Restrooms.getOne(restroom?.id),
  );

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const reviews = details?.reviews;


  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error occurred...</span>;
  }

  return (
    <>
      {console.log(details)}
      {reviews &&
        reviews.map((review) => (
          <Review
            author={review.author}
            score={review.rating.rating}
            text={review.content}
          />
        ))}
      <div className='dropdown'>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Hide Review Form' : 'Add Review'}
        </button>
        {showReviewForm && <AddReview selectedRestroom={details} />}
      </div>
    </>
  );
}
