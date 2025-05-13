import React from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const VehicleDetail = () => {
  const { vehicleId } = useParams();
  const { store, addToFavorites, removeFromFavorites, isFavorite } = useGlobalReducer();

  const vehicle = store.vehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    return <div className="container mt-5"><h2>Loading vehicle details...</h2></div>;
  }

  const vehicleData = vehicle.properties;
  const isInFavorites = isFavorite(vehicle);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFromFavorites(vehicle);
    } else {
      addToFavorites(vehicle);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img 
              src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`} 
              className="img-fluid rounded-start" 
              alt={vehicleData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">{vehicleData.name}</h2>
                <button 
                  onClick={handleFavoriteToggle} 
                  className={`btn ${isInFavorites ? 'btn-danger' : 'btn-outline-warning'}`}
                >
                  {isInFavorites ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
                </button>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Model:</strong> {vehicleData.model}</p>
                  <p><strong>Manufacturer:</strong> {vehicleData.manufacturer}</p>
                  <p><strong>Class:</strong> {vehicleData.vehicle_class}</p>
                  <p><strong>Cost:</strong> {vehicleData.cost_in_credits} credits</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Length:</strong> {vehicleData.length} m</p>
                  <p><strong>Crew:</strong> {vehicleData.crew}</p>
                  <p><strong>Passengers:</strong> {vehicleData.passengers}</p>
                  <p><strong>Max Speed:</strong> {vehicleData.max_atmosphering_speed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/vehicles" className="btn btn-secondary">Back to Vehicles</Link>
    </div>
  );
};

export default VehicleDetail;