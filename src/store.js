export const initialStore = () => {
  return {
    characters: [],
    planets: [],
    vehicles: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_characters':

      return {
        ...store,
        characters: action.payload
      };
    case 'load_planets':
      return {
        ...store,
        planets: action.payload
      };
    case 'load_vehicles':
      return {
        ...store,
        vehicles: action.payload
      };
    case 'add_favorite':

      const isFavorite = store.favorites.some(
        fav => fav.id === action.payload.id && fav.type === action.payload.type);

      if (!isFavorite) {
        const updatedStore = {
          ...store,
          favorites: [...store.favorites, action.payload]
        };
        localStorage.setItem('starWarsStore', JSON.stringify(updatedStore));
        return updatedStore;
      }
      return store;

    case 'remove_favorite':
      
      const updatedStore = {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.id === action.payload.id && fav.type === action.payload.type)
        )
      };
      localStorage.setItem('starWarsStore', JSON.stringify(updatedStore));
      return updatedStore;

    default:
      throw Error('Unknown action.');
  }
}
