import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";

export const Header = ({startLogout, username}) => (
  <header className="header">
    <div className="content-container">
    <div className="header__content">
    {username && <h2 className="header__title greeting"><em>Hi {username.charAt(0).toUpperCase() + username.slice(1)}</em></h2>}
    <NavLink activeClassName="header__active-class" className="header__title" to="/homePage">
    <h2>Movies</h2>
    </NavLink>
   
    {/* <NavLink to="/create" activeClassName="is-active">   Create Recommendation</NavLink>
    <br/> */}
    <NavLink activeClassName="header__active-class" className="header__title" to="/messages" > <h2>Messages</h2></NavLink>
    <NavLink activeClassName="header__active-class" className="header__title" to="/watchList" > <h2>Watch List</h2></NavLink>
    <NavLink activeClassName="header__active-class" className="header__title" to="/friends" ><h2>Friends</h2> </NavLink>
    <button className="header__title button button--link" onClick={startLogout}>Logout</button>
    </div>
    </div>
  </header>
);
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});
const mapStateToProps = (state) => ({
  username: state.auth.username
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
