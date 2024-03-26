import { useQuery } from 'react-query';
import { Buildings } from '../api/requests/Buildings';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import { useAuthStore } from '../store/userStore';
import AddReview from '../components/AddReview';
import AddRestroom from '../components/AddRestroom';
import RestroomDetails from '../components/RestroomDetails';

export default function BuildingsList() {
  const {
    data: buildings,
    isLoading,
    isError,
    refetch,
  } = useQuery('buildings', Buildings.getAll);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRestroom, setSelectedRestroom] = useState(null);

  const restrooms = selectedBuilding?.restrooms;
  const isAdmin = useAuthStore.getState().isAdmin;

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error occurred...</span>;
  }

  return (
    <>
      <div className='buildings-list main'>
        {buildings
          ?.sort((a, b) => a.name > b.name)
          .map((building) => (
            <div
              className='buildings-list item'
              key={building.id}
              onClick={() => {
                setSelectedBuilding(building);
                setSelectedRestroom(null);
              }}
            >
              {building.name}
            </div>
          ))}
      </div>
      {restrooms &&
        restrooms?.map((restroom) => (
          <div
            className='restroom-list'
            key={restroom.id}
            onClick={() => setSelectedRestroom(restroom)}
          >
            <span className='restroom-name'>{restroom.name}</span>
            <Rating
              readonly={true}
              initialValue={restroom.rating}
              allowFraction={true}
            />
            <span className='restroom-description'>{restroom.description}</span>
          </div>
        ))}
      {selectedRestroom && <RestroomDetails restroom={selectedRestroom} />}
      {isAdmin && <AddRestroom building={selectedBuilding} onAdd={refetch} />}
    </>
  );
}
