import CampusMap from '../components/CampusMap';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Buildings as BuildingApi } from '../api/requests/Buildings';
import { Rating } from 'react-simple-star-rating';

interface Restroom {
  id: string;
  name: string;
  description: string;
  rating: number;
}

export default function Buildings() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const { data: buildings } = useQuery('buildings', BuildingApi.getAll);

  const buildingDetails = buildings?.find(
    (building) => building.name === selectedBuilding,
  );

  const restrooms: Restroom[] = buildingDetails?.restrooms;

  return (
    <>
      <div id='map-container'>
        <CampusMap setSelectedBuilding={setSelectedBuilding} />
      </div>

      <aside className={`sidebar ${selectedBuilding ? 'open' : ''}`}>
        <div className='building-details'>
          <span className='building-name'>{buildingDetails?.name}</span>
          <span className='building-desc'>{buildingDetails?.description}</span>
        </div>
        <div className='restroom-list'>
          {restrooms &&
            restrooms.map((restroom) => (
              <div className='restroom-item' key={restroom.id}>
                <span className='restroom-name'>{restroom.name}</span>
                <Rating
                  readonly={true}
                  initialValue={restroom?.rating}
                  allowFraction={true}
                />
              </div>
            ))}
        </div>
      </aside>
    </>
  );
}
