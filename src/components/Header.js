import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Movies</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/create" activeClassName="is-active">   Create Recommendation</NavLink>
    <NavLink to="/watchList" activeClassName="is-active">   My Watching list</NavLink>
  </header>
);

export default Header;
