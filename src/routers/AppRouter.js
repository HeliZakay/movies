import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import AddRecommendation from '../components/AddRecommendation';
import EditRecommendation from '../components/EditRecommendation';
import WatchList from '../components/WatchList';

export let history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/homePage" component={HomePage} />
        <Route path="/create" component={AddRecommendation} />
        <Route path="/watchList" component={WatchList} />
        <Route path="/edit/:id" component={EditRecommendation} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
