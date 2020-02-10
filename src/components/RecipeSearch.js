import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../context/index';


const HomeSearch = styled.section`
    position:absolute;
    left:50%;
    transform:translate(-50%,0);

  .search__input {
    display:flex;
    margin:auto;

    @media only screen and (min-width:600px) {
      max-width:35rem;
      width:90vw;

      input {
        width:80%;
      }

      button {
        width:20%;
        font-size:1.2rem;
      }
    }

    input {
      margin:0;
      padding:0.5rem;
      border:none;
      background:#FAFAFA;
      border-radius: 15px 0 0 15px;
      box-shadow: 0px 2px 2px rgba(0,0,0,0.1);
      font-family:arial;
      font-style:italic;
    }

    button {
      margin:0;
      padding:0;
      border:none;
      background:#FF5D5D;
      color:white;
      padding:0.5rem;
      border-radius: 0 15px 15px 0;
      cursor:pointer;
      box-shadow: 0px 2px 2px rgba(0,0,0,0.1);
      font: 1rem arial;
      font-weight:bold;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #FF5D5D;
        background-color: white;
      }
    }
  }
`;

const RecipeSearch = () => {
  const appContext = useContext(RecipeContext);
  const { handleSearchChange, handleFormSubmit, searchTerm } = appContext;

  const history = useHistory();


  const handleSubmit = (e) => {
    handleFormSubmit(e);
    if (searchTerm !== '') {
      history.push(`/query/${searchTerm}`);
    }
  };

  return (
    <HomeSearch>
      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="search__input">
          <input onChange={(e) => handleSearchChange(e)} type="text" id="search" placeholder="Search for a recipe..." autoComplete="off" />
          <button type="submit">
            Search
          </button>
        </div>
      </form>
    </HomeSearch>
  );
};

export default RecipeSearch;
