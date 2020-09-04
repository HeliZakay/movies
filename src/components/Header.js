import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";

export const Header = ({startLogout}) => (
  <header>
    <h1>Movies</h1>
    <NavLink to="/homePage" activeClassName="is-active">Home</NavLink>
    <br/>
    <NavLink to="/create" activeClassName="is-active">   Create Recommendation</NavLink>
    <br/>
    <NavLink to="/watchList" activeClassName="is-active">   My Watching list</NavLink>
    <br/>
    <NavLink to="/friends" activeClassName="is-active">   My Friends</NavLink>
    <br/>
    <button onClick={startLogout}>Logout</button>
  </header>
);
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
