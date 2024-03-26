import CampusMap from '../components/CampusMap';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Buildings as BuildingApi } from '../api/requests/Buildings';
import { Rating } from 'react-simple-star-rating';
import RestroomDetails from '../components/RestroomDetails';
import '../styles/Sidebar.css';

interface Restroom {
  id: string;
  name: string;
  description: string;
  rating: number;
}

export default function Buildings() {
  const childFnRef = useRef();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { data: buildings } = useQuery('buildings', BuildingApi.getAll);

  const buildingDetails = buildings?.find(
    (building) => building.name === selectedBuilding,
  );

  const restrooms: Restroom[] = buildingDetails?.restrooms;
  const handleUnzoom = () => {
    setIsZoomed(false);
    setSelectedBuilding(null);
    setSelectedRestroom(null);
  };

  return (
    <>
      <div id='map-container'>
        <CampusMap
          setSelectedBuilding={setSelectedBuilding}
          setSelectedRestroom={setSelectedRestroom}
          onUnzoom={handleUnzoom}
          isZoomed={isZoomed}
          ref={childFnRef}
        />
      </div>

      <aside className={`sidebar ${selectedBuilding ? 'open' : ''}`}>
        <div className='building-picture'>
          <img
            src='pic.jpg'
            alt='Image not found'
            width='100%'
            height='100%'
          ></img>
        </div>
        <div className='building-details'>
          <span className='building-name'>{buildingDetails?.name}</span>
          <span className='building-desc'>{buildingDetails?.description}</span>
        </div>
        <center>
          {' '}
          <h2> Toilets Available: </h2>{' '}
        </center>
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
            ))}{!selectedRestroom &&
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
          <button className='toilet-button'>
            <div className='frame'>
              <div className='text'> Insert Text Here</div>
              <div className='div'>
                <img className='stars' alt='Frame' src='frame-1.svg' />
                <div className='text-wrapper'>183m</div>
              </div>
            </div>
          </button>
          <button className='toilet-button'>
            <div className='frame'>
              <div className='text'> Bathroom Here </div>
              <div className='div'>
                <img className='stars' alt='Frame' src='frame-1.svg' />
                <div className='text-wrapper'>183m</div>
              </div>
            </div>
          </button>
          <button className='toilet-button'>
            <div className='frame'>
              <div className='text'> Another Banyo </div>
              <div className='div'>
                <img className='stars' alt='Frame' src='frame-1.svg' />
                <div className='text-wrapper'>183m</div>
              </div>
            </div>
          </button>
        </div>
        <div className='restroom-details'>
          {selectedRestroom && <RestroomDetails restroom={selectedRestroom} />}
        </div>
        <svg
          id='back-arrow'
          data-name='back-arrow'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 122.88 108.06'
          style={{ scale: `0.2`, position: `absolute`, zIndex: `1001` }}
          onClick={() => {
            handleUnzoom();
            childFnRef.current.handleUnzoom();
          }}
        >
          <title>back-arrow</title>
          <path d='M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z' />
        </svg>
      </aside>
    </>
  );
}
