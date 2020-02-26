import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import { RecipeContext } from '../context/index';

import ListIcon from '@material-ui/icons/List';


const HeaderSection = styled.header`
  position:relative;
  width:100%;
  margin:0;
  overflow:hidden;
  background-color: #FF5D5D;
  box-shadow:0px 3px 3px rgba(0,0,0,0.1);
  z-index:5;

  @media only screen and (min-width:480px) {
    display:flex;
    justify-content:space-around;
    align-items:center;
  }

  h1 {
      font:2rem Third Storey;
      text-align:center;
      margin:0;
      color:white;

      @media only screen and (min-width:480px) {
        text-align:left;
        padding-left:1rem;
      }
  }

  .home {
    text-decoration:none;
  }

  div {
    margin:1rem;
    position:relative;
    @media only screen and (min-width:480px) {
      right:.5rem;
    }
  }

  .header__list__button {
    position:relative;
    border:none;
    background-color:transparent;
    color:white;
    cursor:pointer;
    transition: 0.3s all linear;
    width:100vw;
    margin-bottom:1rem;

    @media only screen and (min-width:480px) {
      width:auto;
      margin-bottom:0;
    }

    &:hover {
      transform:scale(1.2);
    }

    .home__list-icon {
      font-size:2rem;
    }
  }
`;

const Header = () => {
  const appContext = useContext(RecipeContext);
  const {
    handleReturnHome,
  } = appContext;
  const history = useHistory();
  const listButtonHandler = () => {
      history.push('/lists/');
  };

  return (
    <>
      <HeaderSection>
        <Link className="home" to="/" onClick={handleReturnHome}>
          <h1>A PINCH OF SALT...</h1>
        </Link>
        <div>
          <RecipeSearch />
        </div>
        <button class="header__list__button" type="button" onClick={listButtonHandler}>
          <ListIcon className="home__list-icon" />
        </button>
        
      </HeaderSection>
    </>
  );
};

export default Header;
