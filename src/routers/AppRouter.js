import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import AddRecommendation from '../components/AddRecommendation';
import EditRecommendation from '../components/EditRecommendation';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/create" component={AddRecommendation} />
        <Route path="/edit/:id" component={EditRecommendation} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
