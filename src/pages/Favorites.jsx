import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

const Favorites = () => {
  const { store, removeFromFavorites } = useGlobalReducer();
  const characterFavorites = store.favorites.filter(fav => fav.type === "character");
  const planetFavorites = store.favorites.filter(fav => fav.type === "planet");
  const vehicleFavorites = store.favorites.filter(fav => fav.type === "vehicle");

 
  if (store.favorites.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h1>Your Favorites</h1>
          <div className="alert alert-info mt-4">
            <h4 className="alert-heading">No favorites yet!</h4>
            <p>Explore characters, planets, and vehicles and add them to your favorites.</p>
            <hr />
            <div className="d-flex justify-content-center gap-3">
              <Link to="/characters" className="btn btn-primary">
                Explore Characters
              </Link>
              <Link to="/planets" className="btn btn-primary">
                Explore Planets
              </Link>
              <Link to="/vehicles" className="btn btn-primary">
                Explore Vehicles
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Your Favorites</h1>

      {characterFavorites.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Characters</h2>
          <div className="row">
            {characterFavorites.map((character) => (
              <div className="col-md-4 mb-4" key={character.id}>
                <Card
                  item={character}
                  title={character.properties?.name}
                  imageUrl={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
                  description={`Gender: ${character.properties?.gender} | Birth Year: ${character.properties?.birth_year}`}
                  linkTo={`/characters/${character.id}`}
                  showRemoveButton={true}
                  onRemove={() => removeFromFavorites(character)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {planetFavorites.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Planets</h2>
          <div className="row">
            {planetFavorites.map((planet) => (
              <div className="col-md-4 mb-4" key={planet.id}>
                <Card
                  item={planet}
                  title={planet.properties?.name}
                  imageUrl={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
                  description={`Climate: ${planet.properties?.climate} | Terrain: ${planet.properties?.terrain}`}
                  linkTo={`/planets/${planet.id}`}
                  showRemoveButton={true}
                  onRemove={() => removeFromFavorites(planet)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {vehicleFavorites.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Vehicles</h2>
          <div className="row">
            {vehicleFavorites.map((vehicle) => (
              <div className="col-md-4 mb-4" key={vehicle.id}>
                <Card
                  item={vehicle}
                  title={vehicle.properties?.name}
                  imageUrl={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`}
                  description={`Model: ${vehicle.properties?.model} | Manufacturer: ${vehicle.properties?.manufacturer}`}
                  linkTo={`/vehicles/${vehicle.id}`}
                  showRemoveButton={true}
                  onRemove={() => removeFromFavorites(vehicle)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;