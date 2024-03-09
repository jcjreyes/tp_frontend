import { useQuery } from 'react-query';
import { Buildings } from '../api/requests/Buildings';
import Review from '../components/Review';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
export default function BuildingsList() {
  const { data: buildings } = useQuery('buildings', Buildings.getAll);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const restrooms = selectedBuilding?.restrooms;

  return (
    <>
      <div className='buildings-list main'>
        {buildings?.map((building) => (
          <div
            className='buildings-list item'
            key={building.id}
            onClick={() => setSelectedBuilding(building)}
          >
            {building.name}
          </div>
        ))}
      </div>
      {/* <Review author={'mama mo'} score={2.41} text={'bruh'} /> */}
      {restrooms &&
        restrooms?.map((restroom) => (
          <div className='restroom-list' key={restroom.id}>
            <span className='restroom-name'>{restroom.name}</span>
            <Rating
              readonly={true}
              initialValue={restroom.rating}
              allowFraction={true}
            />
          </div>
        ))}
    </>
  );
}
