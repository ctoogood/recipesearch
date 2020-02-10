/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import styled from 'styled-components'
import { RecipeContext } from '../context/index';
import Header from './Header';
import Recipe from './Recipe';

const List = styled.section`
    max-width: 1000px;
    margin:auto;
    margin-bottom:1rem;
    margin-top:1rem;

    
    @media only screen and (min-width:480px) {
      display:grid;
      grid-template-columns: 1fr 1fr;
      grid-gap:2rem;
    }
  
    @media only screen and (min-width:800px) {
      grid-template-columns: 1fr 1fr 1fr;
      margin:auto;
      margin-top:2rem;
      margin-bottom:2rem;
  
  
    }

    .loading {
      text-align:center;
      font-family: Third Storey;
      color: #F83737;
      height:100vh;
    }
`;

const Loading = styled.h1`
    text-align:center;
    font-family: Third Storey;
    color: #F83737;
    height:100vh;
`;

const RecipeList = () => {
  const appContext = useContext(RecipeContext);
  const { recipes, loading } = appContext;
  return (
    <>
      <Header />
      {loading ? <Loading>Loading...</Loading>
        : recipes.length > 0 ? (
          <List>
            {recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
          </List>
        ) : <Loading className="loading">No Results, Try Again..</Loading> }

    </>
  );
};

export default RecipeList;
