import React, { useState, useEffect } from 'react';
import usePersistedState from '../utils/usePersistedState';
import { useHttpClient } from '../hooks/http-hook';

const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_RECIPE_API_KEY;
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = usePersistedState('searchTerm', '');
  const [query, setQuery] = useState('');

  // RECIPE SEARCH

  const url = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${pageSize}&query=${searchTerm}`;

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    setOffset(0);
    document.getElementById('form').reset();
  };

  const handleReturnHome = () => {
    setSearchTerm('');
  };

  const handleScroll = () => {
    setOffset(recipes.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeSearch = await fetch(url);
        const recipeSearchResults = await recipeSearch.json();
        // localStorage.setItem(searchTerm, JSON.stringify(recipeSearchResults.results));
        setRecipes(recipeSearchResults.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    // const cachedHits = localStorage.getItem(searchTerm);
    // setOffset(0);
    // if (cachedHits) {
    //   setLoading(true);
    //   setRecipes(JSON.parse(cachedHits));
    //   setLoading(false);
    // } else {
      fetchData();
    // }
  }, [searchTerm, url]);

  useEffect(() => {
    const fetchMoreRecipes = async () => {
      try {
        const searchedRecipeData = await fetch(`${url}&offset=${offset}`);
        const recipeResults = await searchedRecipeData.json();
        // eslint-disable-next-line no-shadow
        recipeResults.results.forEach((recipe) => setRecipes((recipes) => [...recipes, recipe]));
        setIsFetching(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (offset >= pageSize) {
      setIsFetching(true);
      fetchMoreRecipes();
    }
  }, [offset, url]);

  // User Recipe Lists

    const [ loadedList, setLoadedList ] = useState([]);
    const { sendRequest } = useHttpClient();
    useEffect(() => {
        const getRecipeList = async () => {
            try {
                setLoading(true);
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/lists/`); //Get from signed in user...
                setLoadedList(responseData.recipes)
                setLoading(false);
            } catch (e) {
                console.log(e)
            }
        }
        getRecipeList();
    },[sendRequest])

    

  // Authentication

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const changeLoginHandler = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      query,
      loading,
      isFetching,
      searchTerm,
      loggedIn,
      isLoginMode,
      loadedList,
      changeLoginHandler,
      handleSearchChange,
      handleFormSubmit,
      handleReturnHome,
      handleScroll,
      setLoggedIn,
      setLoadedList,
      setLoading
    }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
