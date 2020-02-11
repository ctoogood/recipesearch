import React, { useState, useEffect } from 'react';
import usePersistedState from '../utils/usePersistedState';

const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_RECIPE_API_KEY;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = usePersistedState('searchTerm', '');
  const [query, setQuery] = useState('');

  const url = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${pageSize}&query=${searchTerm}`;


  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    document.getElementById('form').reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(url);
        setLoading(true);
        const recipeSearch = await fetch(url);
        const recipeSearchResults = await recipeSearch.json();
        localStorage.setItem(searchTerm, JSON.stringify(recipeSearchResults));
        setRecipes(recipeSearchResults.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [searchTerm, url]);


  return (
    <RecipeContext.Provider value={{
      recipes,
      loading,
      searchTerm,
      handleSearchChange,
      handleFormSubmit,
    }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
