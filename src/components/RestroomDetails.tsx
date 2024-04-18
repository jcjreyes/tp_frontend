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
    refetch,
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
      <div className='review-list'>
        {reviews &&
          reviews.map((review) => (
            <Review
              author={review.author.username}
              score={review.rating.rating}
              text={review.content}
            />
            
          ))}
      </div>
      <div className='tags'>
        <span>
          {details?.tags.map((tag, idx) => (
            <span className="tag">
              {tag.name}
            </span>
          ))}
        </span>
      </div>
      <div className='dropdown'>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Hide Review Form' : 'Add Review'}
        </button>
        {showReviewForm && (
          <AddReview selectedRestroom={details} onAdd={refetch} />
        )}
      </div>
    </>
  );
}
