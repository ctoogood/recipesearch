import React, { useContext } from 'react';
import { RecipeContext } from '../context/index';
import Header from './Header';

const RecipeList = () => {
  const appContext = useContext(RecipeContext);
  const { recipes, loading } = appContext;
  return (
    <div>
      <Header />

    </div>
  );
};

export default RecipeList;
