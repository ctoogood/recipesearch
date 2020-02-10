import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import { RecipeContext } from '../context/index';

const HeaderSection = styled.header`
  position:relative;
  width:100%;
  margin:0;
  overflow:hidden;
  background-color: #FF5D5D;
  box-shadow:0px 3px 3px rgba(0,0,0,0.1);

  @media only screen and (min-width:480px) {
    display:grid;
    grid-template-columns:3fr 1fr;
  }

  h1 {
      font:2rem Third Storey;
      text-align:center;
      margin:0;
      margin-top:1rem;
      color:white;

      @media only screen and (min-width:480px) {
        text-align:left;
        padding-left:1rem;
        width:50vw;
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
`;

const Header = () => {
  const appContext = useContext(RecipeContext);
  const {
    handleReturnHome,
  } = appContext;

  return (
    <>
      <HeaderSection>
        <Link className="home" to="/" onClick={handleReturnHome}>
          <h1>A PINCH OF SALT...</h1>
        </Link>
        <div>
          <RecipeSearch />
        </div>
      </HeaderSection>
    </>
  );
};

export default Header;
