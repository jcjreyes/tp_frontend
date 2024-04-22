import { useQuery } from 'react-query';
import { Buildings } from '../api/requests/Buildings';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import { useAuthStore } from '../store/userStore';
import AddRestroom from '../components/AddRestroom';
import RestroomDetails from '../components/RestroomDetails';
import som_pic from '../assets/jgsom.png';
import '../styles/BuildingsList.css';

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

  const buildingDetails = buildings?.find(
    (building) => building.name === selectedBuilding?.name,
  );

  return (
    <>
      <div className='buildings-list main'>
        <h2 className='buildings-list header'>Buildings:</h2>
        {buildings
          ?.sort((a, b) => a.name > b.name)
          .map((building) => (
            <div
              className='buildings-list item'
              key={building.id}
              onClick={() => {
                setSelectedBuilding(building);
                setSelectedRestroom(null);
                console.log(buildings);
                console.log(selectedBuilding);
                console.log(buildingDetails);
              }}
            >
              {building.name}
            </div>
          ))}
      </div>
      {/*<div className='restroom-list'>
        {restrooms &&
          restrooms?.map((restroom) => (
            <div
              className='restroom-container'
              key={restroom.id}
              onClick={() => setSelectedRestroom(restroom)}
            >
              <span className='restroom-name'>{restroom.name}</span>
              <Rating
                readonly={true}
                initialValue={restroom.rating}
                allowFraction={true}
              />
              <span className='restroom-description'>
                {restroom.description}
              </span>
            </div>
          ))}
        {restrooms?.length == 0 && (
          <div className='restroom-container'>
            <span className='restroom-error'>
              There are no restrooms available.
            </span>
          </div>
        )}
      </div>
      {selectedRestroom && <RestroomDetails restroom={selectedRestroom} />}
      {isAdmin && <AddRestroom building={selectedBuilding} onAdd={refetch} />} */}
      <aside className={`sidebar ${selectedBuilding ? 'open' : ''}`}>
        <svg
          id='back-arrow'
          data-name='back-arrow'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 122.88 108.06'
          style={{ scale: `0.2`, position: `absolute`, zIndex: `1001` }}
          onClick={() => {
            setSelectedBuilding(null);
          }}
        >
          <title>back-arrow</title>
          <path d='M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z' />
        </svg>
        <div className='building-picture'>
          <img
            src={som_pic}
            alt='Image not found'
            width='100%'
            height='100%'
          ></img>
        </div>
        {selectedRestroom && (
          <div className='building-details restroom-information'>
            <span className='building-name'>{selectedRestroom?.name}</span>
            <Rating
              readonly={true}
              initialValue={selectedRestroom?.rating}
              allowFraction={true}
            />
          </div>
        )}
        {selectedRestroom && (
          <div className='restroom-description-box'>
            <span className='building-desc'>
              {selectedRestroom?.description}
            </span>
          </div>
        )}
        {!selectedRestroom && (
          <div className='building-details'>
            <span className='building-name'>{buildingDetails?.name}</span>
            <span className='building-desc'>
              {buildingDetails?.description}
            </span>
          </div>
        )}
        {!selectedRestroom && (
          <center>
            {restrooms?.length != 0 ? (
              <h2> Toilets Available: </h2>
            ) : (
              <h2>There are no toilets available.</h2>
            )}
          </center>
        )}
        {!selectedRestroom && (
          <div className='restroom-list'>
            {!selectedRestroom &&
              restrooms &&
              restrooms.map((restroom) => (
                <div
                  className='restroom-item'
                  key={restroom.id}
                  onClick={() => setSelectedRestroom(restroom)}
                >
                  <span className='restroom-name'>{restroom.name}</span>
                  <div className='restroom-other'>
                    <Rating
                      readonly={true}
                      initialValue={restroom?.rating}
                      allowFraction={true}
                    />
                    <div className='text-wrapper'>183m</div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {isAdmin && !selectedRestroom && (
          <AddRestroom building={selectedBuilding} onAdd={refetch} />
        )}
        {selectedRestroom && (
          <div className='restroom-details'>
            <h3>Reviews</h3>
            <RestroomDetails restroom={selectedRestroom} />
          </div>
        )}
      </aside>
    </>
  );
}
