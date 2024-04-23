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

  const [showReviewForm, setShowReviewForm] = useState(true);
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
      <div className='dropdown'>
        {showReviewForm && (
          <AddReview selectedRestroom={details} onAdd={refetch} />
        )}
      </div>
      <div className='review-list'>
        {reviews &&
          reviews.map((review) => {
            return (
              <div>
                <Review
                  author={review.author.username}
                  score={review.rating.rating}
                  text={review.content}
                  images={review.images}
                />
                {console.log(review.images)}
              </div>
            );
          })}
      </div>
      <div className='tags'>
        <span>
          {details?.tags.map((tag, idx) => (
            <span className='tag'>{tag.name}</span>
          ))}
        </span>
      </div>
    </>
  );
}
