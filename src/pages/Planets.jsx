import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card.jsx";

const Planets = () => {
  const { store, fetchPlanets } = useGlobalReducer();

  useEffect(() => {
    if (store.planets.length === 0) {
      fetchPlanets();
    }
  }, [fetchPlanets, store.planets.length]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Star Wars Planets</h1>
      <div className="row">
        {store.planets.map((planet) => (
          <div className="col-md-4 mb-4" key={planet.id}>
            <Card 
              item={planet}
              title={planet.properties?.name}
              imageUrl={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
              description={`Climate: ${planet.properties?.climate} | Terrain: ${planet.properties?.terrain}`}
              linkTo={`/planets/${planet.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;