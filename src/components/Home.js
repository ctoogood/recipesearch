import React from 'react';
import styled from 'styled-components';

import bgImage from '../images/spoonOfCheese.jpg';
import RecipeSearch from './RecipeSearch';


const Main = styled.main`
  height:100vh;
  width:100%;
  margin:0;
  overflow:hidden;
  padding-top:5rem;
  background-image:url(${bgImage});
  background-size:cover;
  background-position:center;
  overflow:hidden;
  border-bottom: 2rem solid #FF5D5D;

  h1 {
    font:3rem Third Storey;
    text-align:center;
    margin:0;
    color:#F83737;
    margin:1rem;

    @media only screen and (min-width:600px) {
      font-size:5rem;
      margin:0;
      padding:4rem;
      line-height:1.5;
    }
    
    @media only screen and (min-width:900px) {
      font-size:7rem
    }
  }

  .home {
    text-decoration:none;
  }
  `;

const Home = () => (
  <Main>
    <h1>A Pinch Of Salt...</h1>
    <RecipeSearch />
  </Main>
);

export default Home;
