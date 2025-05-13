import React from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PlanetDetail = () => {
  const { planetId } = useParams();
  const { store, addToFavorites, removeFromFavorites, isFavorite } = useGlobalReducer();

  const planet = store.planets.find(p => p.id === planetId);

  if (!planet) {
    return <div className="container mt-5"><h2>Loading planet details...</h2></div>;
  }

  const planetData = planet.properties;
  const isInFavorites = isFavorite(planet);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFromFavorites(planet);
    } else {
      addToFavorites(planet);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img 
              src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`} 
              className="img-fluid rounded-start" 
              alt={planetData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">{planetData.name}</h2>
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
                  <p><strong>Climate:</strong> {planetData.climate}</p>
                  <p><strong>Terrain:</strong> {planetData.terrain}</p>
                  <p><strong>Population:</strong> {planetData.population}</p>
                  <p><strong>Diameter:</strong> {planetData.diameter} km</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Rotation Period:</strong> {planetData.rotation_period} hours</p>
                  <p><strong>Orbital Period:</strong> {planetData.orbital_period} days</p>
                  <p><strong>Gravity:</strong> {planetData.gravity}</p>
                  <p><strong>Surface Water:</strong> {planetData.surface_water}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/planets" className="btn btn-secondary">Back to Planets</Link>
    </div>
  );
};

export default PlanetDetail;