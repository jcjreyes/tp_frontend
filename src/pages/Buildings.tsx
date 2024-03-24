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
        <div className='building-picture'>
          <img src="pic.jpg" alt="Image not found" width="100%" height="100%"></img>
        </div>
        <div className='building-details'>
          <span className='building-name'>{"Cilantro Eastwood"}</span>
          <span className='building-desc'>{"(Description) Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"}</span>
        </div>
        <center> <h2> Toilets Available: </h2> </center>
        <div className='restroom-list'>
          <button className="toilet-button">
            <div className="frame">
              <div className="text"> Insert Text Here</div>
                <div className="div">
                  <img className="stars" alt="Frame" src="frame-1.svg" />
                  <div className="text-wrapper">183m</div>
                </div>
            </div>
          </button>
          <button className="toilet-button">
            <div className="frame">
              <div className="text"> Bathroom Here </div>
                <div className="div">
                  <img className="stars" alt="Frame" src="frame-1.svg" />
                  <div className="text-wrapper">183m</div>
                </div>
            </div>
          </button>
          <button className="toilet-button">
            <div className="frame">
              <div className="text"> Another Banyo </div>
                <div className="div">
                  <img className="stars" alt="Frame" src="frame-1.svg" />
                  <div className="text-wrapper">183m</div>
                </div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
