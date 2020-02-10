import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RecipeDisplay = styled.section`
    margin:auto;
    border-radius:10px;
    margin-bottom:1rem;
    @media only screen and (min-width:480px) {
      margin-bottom:0;
    }

    .recipe__link {
      text-decoration:none;
      
      &:hover img {
        filter:brightness(1);
      }

      &:hover h1 {
        background-color:#FF5D5D;
        border-radius:5px;
      }
    }

    h1 {
        font-family: Third Storey;
        font-size:1.5rem;
        color: white;
        position:absolute;
        top:40%;
        left:50%;
        transform:translate(-50%,-50%);
        z-index:2;
        text-align:center;
        line-height:1.5;
        transition:all 0.3s ease-in-out;
        padding:0.5rem;

    }

    .recipe__image {
      position:relative;
    }
      
    img {
      width:100%;
      object-fit:cover;
      filter:brightness(0.7);
      box-shadow:0px 3px 3px rgba(0,0,0,0.2);
      border-radius:5px;
      transition:all 0.3s ease-in-out;

    }
`;


const Recipe = ({ recipe }) => {
  const imageSize = '556x370';
  return (
    <RecipeDisplay>
      {console.log(recipe)}
      <Link to={`/recipe/${recipe.id}`}>
        <div className="recipe__image">
          <h1>{recipe.title}</h1>
          <img src={`https://spoonacular.com/recipeImages/${recipe.id}-${imageSize}.jpg`} alt={recipe.title} />
        </div>
      </Link>
    </RecipeDisplay>
  );
};

export default Recipe;

Recipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.number.isRequired,
    spoonacularSourceUrl: PropTypes.string,
  }).isRequired,
};
