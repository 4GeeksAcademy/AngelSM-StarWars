import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card.jsx";

const Vehicles = () => {
  const { store, fetchVehicles } = useGlobalReducer();

  useEffect(() => {
    if (store.vehicles.length === 0) {
      fetchVehicles();
    }
  }, [fetchVehicles, store.vehicles.length]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Star Wars Vehicles</h1>
      <div className="row">
        {store.vehicles.map((vehicle) => (
          <div className="col-md-4 mb-4" key={vehicle.id}>
            <Card 
              item={vehicle}
              title={vehicle.properties?.name}
              imageUrl={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`}
              description={`Model: ${vehicle.properties?.model} | Manufacturer: ${vehicle.properties?.manufacturer}`}
              linkTo={`/vehicles/${vehicle.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;