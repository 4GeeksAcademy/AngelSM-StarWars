// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Provide the store and dispatch method to all child components.
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    const fetchCharacters = useCallback(async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/people");
            const data = await response.json();

            const detailedCharacters = await Promise.all(
                data.results.map(async (char) => {
                    const detailResponse = await fetch(char.url);
                    const detailData = await detailResponse.json();
                    return {
                        ...detailData.result,
                        id: char.uid,
                        type: "character"
                    };
                })
            );

            dispatch({
                type: 'load_characters',
                payload: detailedCharacters
            });

            return detailedCharacters;
        } catch (error) {
            console.error("Error loading characters:", error);
            return [];
        }
    }, [dispatch]);
    const fetchPlanets = useCallback(async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/planets");
            const data = await response.json();

            const detailedPlanets = await Promise.all(
                data.results.map(async (planet) => {
                    const detailResponse = await fetch(planet.url);
                    const detailData = await detailResponse.json();
                    return {
                        ...detailData.result,
                        id: planet.uid,
                        type: "planet"
                    };
                })
            );

            dispatch({
                type: 'load_planets',
                payload: detailedPlanets
            });

            return detailedPlanets;
        } catch (error) {
            console.error("Error loading planets:", error);
            return [];
        }
    }, [dispatch]);
    const fetchVehicles = useCallback(async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/vehicles");
            const data = await response.json();

            const detailedVehicles = await Promise.all(
                data.results.map(async (vehicle) => {
                    const detailResponse = await fetch(vehicle.url);
                    const detailData = await detailResponse.json();
                    return {
                        ...detailData.result,
                        id: vehicle.uid,
                        type: "vehicle"
                    };
                })
            );

            dispatch({
                type: 'load_vehicles',
                payload: detailedVehicles
            });

            return detailedVehicles;
        } catch (error) {
            console.error("Error loading vehicles:", error);
            return [];
        }
    }, [dispatch]);
    const addToFavorites = useCallback((item) => {
        dispatch({
            type: 'add_favorite',
            payload: item
        });


        const updatedFavorites = [...store.favorites, item];
        localStorage.setItem('starWarsStore', JSON.stringify({
            ...store,
            favorites: updatedFavorites
        }));
    }, [dispatch, store]);


    const removeFromFavorites = useCallback((item) => {
        dispatch({
            type: 'remove_favorite',
            payload: item
        });


        const updatedFavorites = store.favorites.filter(
            fav => !(fav.id === item.id && fav.type === item.type)
        );
        localStorage.setItem('starWarsStore', JSON.stringify({
            ...store,
            favorites: updatedFavorites
        }));
    }, [dispatch, store]);


    const isFavorite = useCallback((item) => {
        return store.favorites.some(
            fav => fav.id === item.id && fav.type === item.type
        );
    }, [store.favorites]);


    const loadInitialData = useCallback(() => {

        const storedData = localStorage.getItem('starWarsStore');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            Object.entries(parsedData).forEach(([key, value]) => {
                if (key === 'characters') {
                    dispatch({ type: 'load_characters', payload: value });
                } else if (key === 'planets') {
                    dispatch({ type: 'load_planets', payload: value });
                } else if (key === 'vehicles') {
                    dispatch({ type: 'load_vehicles', payload: value });
                } else if (key === 'favorites') {
                    value.forEach(item => {
                        dispatch({ type: 'add_favorite', payload: item });
                    });
                }
            });
            return true;
        }


        fetchCharacters();
        fetchPlanets();
        fetchVehicles();
        return false;
    }, [dispatch, fetchCharacters, fetchPlanets, fetchVehicles]);

    return {
        store,
        dispatch,
        fetchCharacters,
        fetchPlanets,
        fetchVehicles,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loadInitialData
    };
}