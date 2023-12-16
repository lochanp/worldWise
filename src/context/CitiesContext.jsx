import { createContext, useEffect, useContext, useReducer, useCallback } from 'react';

const CitesContext = createContext();

const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      throw new Error();
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`http://localhost:8000/cities#`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({ type: 'rejected', payload: 'An error occured while loading the cities' });
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(() => {
    async id => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch {
        dispatch({ type: 'rejected', payload: 'An error occured while loading the city' });
      }
    };
  }, []);

  const createCity = async newCity => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`http://localhost:8000/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: 'An error occured while creating the city' });
    }
  };

  const deleteCity = async id => {
    dispatch({ type: 'loading' });
    try {
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: 'DELETE'
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({ type: 'rejected', payload: 'An error occured while deleting the city' });
    }
  };

  return (
    <CitesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitesContext);
  if (context === undefined) throw new Error('Cities context was used outside of the provider scope!!');
  return context;
}

export { CitiesProvider, useCitiesContext };
