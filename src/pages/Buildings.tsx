import CampusMap from '../components/CampusMap';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Buildings as BuildingApi } from '../api/requests/Buildings';
import { Rating } from 'react-simple-star-rating';
import '../styles/Sidebar.css';

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

      <aside className={'sidebar open'}>
        <div className='building-picture'></div>
        <div className='building-details'>
          <span className='building-name'>{"Cilantro Eastwood"}</span>
          <span className='building-desc'>{"(Description) Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"}</span>
        </div>

        <div className='restroom-list'>
          <div className="column">
            <button className="button">
              <div className="button-title">RESTROOM</div>
              <div className="button-details">
                <span className="button-rating"> * STARS * </span>
                <span className="button-distance">100m</span>
              </div>
            </button>
          </div>
          <div className="column">
            <button className="button">
              <div className="button-title">BANYO</div>
              <div className="button-details">
                <span className="button-rating"> * STARS * </span>
                <span className="button-distance">100m</span>
              </div>
            </button>
          </div>
          <div className="column">
            <button className="button">
              <div className="button-title">OUT OF ORDER</div>
              <div className="button-details">
                <span className="button-rating"> * STARS * </span>
                <span className="button-distance">100m</span>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
