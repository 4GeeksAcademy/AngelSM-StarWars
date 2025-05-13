import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Card = ({ item, title, imageUrl, description, linkTo, showRemoveButton, onRemove }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useGlobalReducer();
  
  const isInFavorites = isFavorite(item);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInFavorites) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  return (
    <div className="card h-100">
      <img 
        src={imageUrl} 
        className="card-img-top" 
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <Link to={linkTo} className="btn btn-primary">
          Learn more
        </Link>
        {showRemoveButton ? (
          <button onClick={handleRemove} className="btn btn-danger">
            Remove
          </button>
        ) : (
          <button 
            onClick={handleFavoriteToggle} 
            className={`btn ${isInFavorites ? 'btn-danger' : 'btn-outline-warning'}`}
          >
            {isInFavorites ? '♥' : '♡'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;