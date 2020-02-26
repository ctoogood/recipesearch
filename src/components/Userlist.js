import React, { useContext } from 'react';
import styled from 'styled-components';
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
    font-family: arial;
    font-weight:lighter;
    font-size:1.2rem;
    color: #F83737;
    height:100vh;
`;

const Title = styled.h1`
    text-align:center;
    font-family: Third Storey;
    color: #F83737;
`;

const Userlist = () => {
    const appContext = useContext(RecipeContext);
    const { loadedList, loading } = appContext;
    return (
        <React.Fragment>
            <Header />
            <Title>My List</Title>
            {loading ? <Loading>Loading...</Loading>
                : loadedList.length > 0 ? (
                <List>
                    {loadedList.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
                </List>
                ) : <Loading className="loading">Nothing in your list,<br />Try searching for a recipe to add</Loading> }
        </React.Fragment>
    );
};

export default Userlist;