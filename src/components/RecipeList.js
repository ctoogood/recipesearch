import React, { useContext } from 'react';
import { RecipeContext } from '../context/index';

const RecipeList = () => {
  const appContext = useContext(RecipeContext);
  const { recipes } = appContext;
  return (
    <div>
      {console.log(recipes)}
    </div>
  );
};

export default RecipeList;
