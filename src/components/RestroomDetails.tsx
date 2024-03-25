import { Restrooms } from '../api/requests/Restrooms';
import AddReview from './AddReview';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function RestroomDetails({ restroom }) {
  const {
    data: details,
    isLoading,
    isError,
  } = useQuery('restrooms', () => Restrooms.getOne(restroom?.id));

  const [showReviewForm, setShowReviewForm] = useState(false);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error occurred...</span>;
  }


  return (
    <>
      <div className='dropdown'>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Hide Review Form' : 'Add Review'}
        </button>
        {showReviewForm && <AddReview selectedRestroom={details} />}
      </div>
    </>
  );
}
