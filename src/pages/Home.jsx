import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
	const { loadInitialData } = useGlobalReducer();
	
	useEffect(() => {
		loadInitialData();
	}, [loadInitialData]);


	return (
		<div className="container mt-4">
      <div className="jumbotron bg-dark text-light p-5 rounded">
        <h1 className="display-4">Welcome to Star Wars Database</h1>
        <p className="lead">
          Explore characters, planets, and vehicles from the Star Wars universe.
          Add your favorites to your personal collection.
        </p>
        <hr className="my-4 bg-light" />
        <p>
          May the Force be with you!
        </p>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-header bg-dark text-white">
              <h3>Characters</h3>
            </div>
            <div className="card-body">
              <img 
                src="https://starwars-visualguide.com/assets/img/characters/1.jpg" 
                alt="Star Wars Characters" 
                className="img-fluid mb-3"
                style={{ maxHeight: "200px" }}
              />
              <p>
                Discover all the amazing characters from the Star Wars universe, from Luke Skywalker to Darth Vader.
              </p>
              <Link to="/characters" className="btn btn-primary">
                Explore Characters
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-header bg-dark text-white">
              <h3>Planets</h3>
            </div>
            <div className="card-body">
              <img 
                src="https://starwars-visualguide.com/assets/img/planets/1.jpg" 
                alt="Star Wars Planets" 
                className="img-fluid mb-3"
                style={{ maxHeight: "200px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
              />
              <p>
                Visit the exotic planets from a galaxy far, far away, from the deserts of Tatooine to the forests of Endor.
              </p>
              <Link to="/planets" className="btn btn-primary">
                Explore Planets
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-header bg-dark text-white">
              <h3>Vehicles</h3>
            </div>
            <div className="card-body">
              <img 
                src="https://starwars-visualguide.com/assets/img/vehicles/4.jpg" 
                alt="Star Wars Vehicles" 
                className="img-fluid mb-3"
                style={{ maxHeight: "200px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
              />
              <p>
                Explore the amazing vehicles and starships used for transportation in the Star Wars universe.
              </p>
              <Link to="/vehicles" className="btn btn-primary">
                Explore Vehicles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};