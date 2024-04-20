import { useQuery } from 'react-query';
import { useAuthStore } from '../store/userStore';
import { profileRequest } from '../api/auth';
import Review from '../components/Review';
import '../styles/Profile.css';
import { Rating } from 'react-simple-star-rating';

export default function Profile() {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery('profile', profileRequest);

  const { logout } = useAuthStore((state) => state);
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{JSON.stringify(error.message)}</span>;
  }

  return (
    <>
      {console.log(profile)}
      {console.log(profile?.reviews)}
      <div className='profile-container'>
        <div className='profile-split left'>
          <div className='profile-summary'>
            <span className='profile-username'>Hello, {profile?.username}!</span>
            <div className='profile-reviewCount'>
              You have {' '}
              {profile?.reviews.length}{' '}
              {profile?.reviews.length == 1 ? 'review' : 'reviews'}{"."}
            </div>
          </div>
          <form onSubmit={handleLogout}>
            <button type='submit' className='logout-button'>Logout</button>
          </form>
        </div>
        <div className='profile-split right'>
          <div className='your-reviews-block'>
            <span className='your-reviews'>Your Reviews</span>
          </div>
          <div className='profile-review-list'>
            {profile?.reviews.map((review) => (
              <div key={review.id} className="review-box">
                <span className='review-header'>{review.rating.restroom.split("-")[0]}</span>
                <div className='review-subheader'>
                  {<Rating readonly={true} initialValue={review.rating.rating} allowFraction={true} />}
                </div>
                <span className='review-body'>{review.rating.restroom.split("-")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
