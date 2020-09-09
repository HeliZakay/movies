import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import Friends from '../components/Friends';
import Signup from '../components/Signup';
import AddRecommendation from '../components/AddRecommendation';
import Messages from '../components/Messages';
import EditRecommendation from '../components/EditRecommendation';
import WatchList from '../components/WatchList';
import Contact from '../components/Contact';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SignupRoute from "./SignupRoute";


export let history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={Login} exact={true} />
        <SignupRoute path="/signup" component={Signup} />
        <PrivateRoute  path="/homePage" component={HomePage} />
        <PrivateRoute  path="/create" component={AddRecommendation} />
        <PrivateRoute  path="/watchList" component={WatchList} />
        <PrivateRoute  path="/edit/:id" component={EditRecommendation} />
        <PrivateRoute  path="/friends" component={Friends} />
        <PrivateRoute  path="/contact" component={Contact} />
        <PrivateRoute  path="/messages" component={Messages} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
