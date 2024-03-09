import CampusMap from '../components/CampusMap';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Buildings as BuildingApi } from '../api/requests/Buildings';

export default function Buildings() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const { data: buildings } = useQuery('buildings', BuildingApi.getAll);

  const buildingDetails = buildings?.filter(
    (building) => building.name === selectedBuilding,
  );
  console.log(buildingDetails);

  return (
    <>
      <CampusMap setSelectedBuilding={setSelectedBuilding} />
      {JSON.stringify(buildingDetails)}
    </>
  );
}
