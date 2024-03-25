import { useQuery } from 'react-query';
import { useAuthStore } from '../store/userStore';
import { profileRequest } from '../api/auth';
import Review from '../components/Review';

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
      <div className='profile-container'>
        <div className='profile-left'>
          <div className='profile-summary'>
            <span className='profile-username'>{profile?.username}</span>
            <span className='profile-reviewCount'>
              {profile?.reviews.length} reviews
            </span>
          </div>
          <form onSubmit={handleLogout}>
            <button type='submit'>Logout</button>
          </form>
        </div>
        <div className='profile-right'>
          {profile?.reviews.map((review) => (
            <Review author={review} score={5} text={'test'} />
          ))}
        </div>
      </div>
    </>
  );
}
