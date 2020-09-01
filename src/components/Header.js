import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";

export const Header = ({startLogout}) => (
  <header>
    <h1>Movies</h1>
    <NavLink to="/homePage" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/create" activeClassName="is-active">   Create Recommendation</NavLink>
    <NavLink to="/watchList" activeClassName="is-active">   My Watching list</NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
