import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";

const Characters = () => {
  const { store, fetchCharacters } = useGlobalReducer();

  useEffect(() => {
    if (store.characters.length === 0) {
      fetchCharacters();
    }
  }, [fetchCharacters, store.characters.length]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Star Wars Characters</h1>
      <div className="row">
        {store.characters.map((character) => (
          <div className="col-md-4 mb-4" key={character.id}>
            <Card 
              item={character}
              title={character.properties?.name}
              imageUrl={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
              description={`Gender: ${character.properties?.gender} | Hair Color: ${character.properties?.hair_color}`}
              linkTo={`/characters/${character.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;