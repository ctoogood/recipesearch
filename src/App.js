import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Home from './components/Home';


const App = () => (
  <Router>
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/query/:query" component={RecipeList} />
        <Route path="/recipe/:id" component={RecipeDetail} />
      </Switch>
    </main>
  </Router>
);

export default App;
