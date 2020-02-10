import React, { useContext } from 'react';
import { RecipeContext } from '../context/index';

const RecipeList = () => {
  const appContext = useContext(RecipeContext);
  const { recipes, loading } = appContext;
  return (
    <div>

    </div>
  );
};

export default RecipeList;
