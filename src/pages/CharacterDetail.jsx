import React from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CharacterDetail = () => {
  const { characterId } = useParams();
  const { store, addToFavorites, removeFromFavorites, isFavorite } = useGlobalReducer();

  const character = store.characters.find(char => char.id === characterId);

  if (!character) {
    return <div className="container mt-5"><h2>Loading character details...</h2></div>;
  }

  const characterData = character.properties;
  const isInFavorites = isFavorite(character);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFromFavorites(character);
    } else {
      addToFavorites(character);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img 
              src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`} 
              className="img-fluid rounded-start" 
              alt={characterData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">{characterData.name}</h2>
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
                  <p><strong>Height:</strong> {characterData.height} cm</p>
                  <p><strong>Mass:</strong> {characterData.mass} kg</p>
                  <p><strong>Hair Color:</strong> {characterData.hair_color}</p>
                  <p><strong>Eye Color:</strong> {characterData.eye_color}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Birth Year:</strong> {characterData.birth_year}</p>
                  <p><strong>Gender:</strong> {characterData.gender}</p>
                  <p><strong>Skin Color:</strong> {characterData.skin_color}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/characters" className="btn btn-secondary">Back to Characters</Link>
    </div>
  );
};

export default CharacterDetail;