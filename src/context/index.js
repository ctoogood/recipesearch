/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';


const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_RECIPE_API_KEY;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [usedSearch, setUsedSearch] = useState('');
  const [url, setUrl] = useState('');


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== '') {
      setUsedSearch(searchTerm);
    }
    const cachedHits = localStorage.getItem(searchTerm);
    if (cachedHits) {
      setRecipes(JSON.parse(cachedHits));
      console.log(cachedHits);
    } else {
      setUrl(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${pageSize}&query=${searchTerm}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeSearch = await fetch(url);
        const recipeSearchResults = await recipeSearch.json();
        localStorage.setItem(usedSearch, JSON.stringify(recipeSearchResults));
        setRecipes(recipeSearchResults.results);
        setLoading(false);
        console.log(recipes);
      } catch (e) {
        console.log(e);
      }
    };
    if (url !== '') {
      fetchData();
    }
  }, [url, usedSearch]);


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
