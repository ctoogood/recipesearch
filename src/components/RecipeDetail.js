/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

import { useHttpClient } from '../hooks/http-hook';
import { RecipeContext } from '../context/index';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


const Recipe = styled.section`
  max-width:1000px;
  margin:auto;
  font-family: Third Storey;
  text-align:center;
  background-color:#F7F7F7;
  margin-bottom:3rem;
  padding-bottom:2rem;


  @media only screen and (min-width:800px) {
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:1rem;
    margin-top:2rem;
    padding:2rem;
    box-shadow:0px 3px 3px rgba(0,0,0,0.2);
  }

  hr {
    border: 0 none;
    border-top: 2px dashed #322f32;
    background: none;
    height:0;
    margin-left:3rem;
    margin-right:3rem;
  }

  h1,h2 {
    line-height:1;
    color:#5E5D5D;
  }

  h1 {
    font-size:2.5rem;
    text-decoration:underline;
    text-decoration-color:#FF5D5D;
  }

  li {
    color:#2D2D2D;
    font-size:1.5rem;
    margin:0.5rem;

  }

    img {
      width:100%;
      object-fit:cover;
      box-shadow:0px 3px 3px rgba(0,0,0,0.2);
  }

  .image__wrapper {
    justify-self: center;

  }

  .recipe__details {
    position:relative;
    p {
      font-size:1.2rem;
    }
    a {
      opacity:0.7;
      text-decoration:none;
      font-size:2rem;
      position:relative;
      top:-1rem;
      color:#5E5D5D;
      transition:all 0.3s ease-in-out;

      &:hover {
        color:#FF5D5D;
      }
    }

    button {
      position:relative;
      right:0;
    }

  }

  .recipe__ingredients {
    margin-top:3rem;
    ul {
      list-style-type:none;
      padding-left:0;
    }
  }

  .recipe__method {
    margin-top:3rem;
  }

  button {
    border:none;
    background:none;
    cursor:pointer;
    color:#FF5D5D;
    

    p {
      display:inline;
      position:relative;
      top:-.5rem;
    }

    .recipe__icon {
    transition:all 0.3s ease-in-out;

    &:hover {
      transform:scale(1.2);
    }
  }
  }


`;

const Loading = styled.h1`
    text-align:center;
    font-family: Third Storey;
    color: #F83737;
    height:100vh;
`;

const RecipeDetail = () => {
  const appContext = useContext(RecipeContext);
  const { loadedList, setLoadedList } = appContext;
  const { id } = useParams();
  const apikey = process.env.REACT_APP_RECIPE_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apikey}`;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchRecipe = useCallback(async () => {
    try {
      setLoading(true);
      const recipeData = await fetch(url);
      const recipeResult = await recipeData.json();
      setRecipe(recipeResult);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [url]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { sendRequest } = useHttpClient();

  const checkList = loadedList.filter(i => i.id === recipe.id);

  const addRecipeHandler = async (e) => {
    e.preventDefault();
    if (checkList.length === 0) {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/lists/add`, 
      'POST',
      JSON.stringify({
        recipe: recipe
      }),
      {
        'Content-Type': 'application/json'
      },
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/lists/remove`,
      'DELETE',
      JSON.stringify({
        recipe: recipe
      }),
      {
        'Content-Type': 'application/json'
      },
      );
    } catch (e) {
      console.log(e)
    }
  }
  
  try {
    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/lists/`); //Get from signed in user...
    setLoadedList(responseData.recipes)
  } catch (e) {
    console.log(e)
  }

}

  const { extendedIngredients } = recipe;

  return (
    <>
      <Header />
      {loading ? <Loading>Loading...</Loading>
        : (
          <Recipe>
            <div className="image__wrapper" id={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <div className="recipe__details">
              <form onSubmit={addRecipeHandler}>
                {checkList.length > 0 ? <button type="submit"><p>Remove from list </p><RemoveCircleIcon className="recipe__icon" fontSize="large" /></button> : <button type="submit"><p>Add to list </p><AddCircleIcon className="recipe__icon" fontSize="large" /></button>}
              </form>
              <h1>{recipe.title}</h1>
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">{recipe.sourceName}</a>
              <hr />
              <p>{`Ready in ${recipe.readyInMinutes} minutes`}</p>
              <p>{`Serves ${recipe.servings}`}</p>
              {recipe.vegan ? <p>Vegan</p> : recipe.vegetarian ? <p>Vegetarian</p> : null}
              {recipe.glutenFree ? <p>Gluten-Free</p> : null}
              <hr />
            </div>
            <div className="recipe__ingredients">
              <h2>Ingredients</h2>
              <ul>
                {extendedIngredients.map((ingredient) => <li key={ingredient.id}>{ingredient.original}</li>)}
              </ul>
            </div>
            <div className="recipe__method">
              <h2>Method</h2>
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step) => <li>{step.step}</li>)}
              </ol>
            </div>
          </Recipe>
        )}
    </>
  );
};

export default RecipeDetail;
