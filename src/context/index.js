import React, { useState, useEffect } from 'react';

const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
  const apiKey = process.env.REACT_APP_RECIPE_API_KEY;
  const appId = process.env.REACT_APP_RECIPE_APP_ID;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState('');


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${apiKey}`);
    document.getElementById('form').reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeSearch = await fetch(url);
        const recipeSearchResults = await recipeSearch.json();
        setRecipes(recipeSearchResults.hits);
        setLoading(false);
        console.log(url);
      } catch (e) {
        console.log(e);
      }
    };
    if (url !== '') {
      fetchData();
    }
  }, [url]);


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
