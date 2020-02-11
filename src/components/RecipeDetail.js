/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import Header from './Header';

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


`;

const Loading = styled.h1`
    text-align:center;
    font-family: Third Storey;
    color: #F83737;
    height:100vh;
`;

const RecipeDetail = () => {
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
  const { extendedIngredients } = recipe;
  return (
    <>
      <Header />
      {loading ? <Loading>Loading...</Loading>
        : (
          <Recipe>
            <Overdrive className="image__wrapper" id={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
            </Overdrive>
            <div className="recipe__details">
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
                {extendedIngredients.map((ingredient) => <li>{ingredient.original}</li>)}
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
