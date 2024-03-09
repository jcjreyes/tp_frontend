import { useQuery } from 'react-query';
import { Buildings } from '../api/requests/Buildings';
import Review from '../components/Review';
export default function BuildingsList() {
  const { data } = useQuery('buildings', Buildings.getAll);
  console.log(data);
  return (
    <>
      <div className='buildings-list main'>
        <div className='buildings-list search'>Sample Search Bar</div>
        <div className='buildings-list item'>Building</div>
        <div className='buildings-list item'>Building</div>
        <div className='buildings-list item'>Building</div>
        <div className='buildings-list item'>Building</div>
        <div className='buildings-list item'>Building</div>
        <Review author={'mama mo'} score={2.41} text={'bruh'} />
      </div>
    </>
  );
}
