import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import ListIcon from '@material-ui/icons/List';

import bgImage from '../images/spoonOfCheese.jpg';
import RecipeSearch from './RecipeSearch';
import { RecipeContext } from '../context/index';

const Main = styled.main`
  height:100vh;
  position:relative;
  width:100%;
  margin:0;
  color:#F83737;
  overflow:hidden;
  padding-top:5rem;
  background-image:url(${bgImage});
  background-size:cover;
  background-position:center;
  overflow:hidden;
  border-bottom: 2rem solid #FF5D5D;

  button {
    position:absolute;
    top:0;
    right:0;
    margin:1rem;
    
    color:white;
    border:none;
    cursor:pointer;
    
  }

  .home__list-icon {
    background-color:#F83737;
    border-radius:50%;
    padding:0.5rem;
    font-size:3rem;
    transition: 0.3s all linear;

    &:hover {
      transform:scale(1.2);
    }
  }

  p {
    position:relative;
    top:-.5rem;
    color:#F83737;
  }

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

  div {
    position:absolute;
    left:50%;
    transform:translate(-50%,0);
  }
  `;

const Home = () => {
  const appContext = useContext(RecipeContext);
  const { loggedIn } = appContext;
  const history = useHistory();
  const listButtonHandler = () => {
    if (loggedIn) {
      history.push('/user/u1');
    } else {
      history.push('/lists/');
    }
  };
  return (
    <Main>
      <button type="button" onClick={listButtonHandler}>
        <ListIcon className="home__list-icon" />
        <p>My List</p>
      </button>
      <h1>A Pinch Of Salt...</h1>
      <div>
        <RecipeSearch />
      </div>
    </Main>
  );
};

export default Home;
