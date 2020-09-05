import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";

export const Header = ({startLogout, username}) => (
  <header className="header">
    <div className="content-container">
    <div className="header__content">
    {username && <h3 className="header__greeting"><em>Hi {username.charAt(0).toUpperCase() + username.slice(1)}</em></h3>}
    <Link className="header__title" to="/homePage">
    <h1>Movies with Friends</h1>
    </Link>
    <br/>
    {/* <NavLink to="/create" activeClassName="is-active">   Create Recommendation</NavLink>
    <br/> */}
    <NavLink className="header__title" to="/watchList" activeClassName="is-active"> <h2>Watching list</h2></NavLink>
    <NavLink className="header__title" to="/friends" activeClassName="is-active"><h2>Friends</h2> </NavLink>
    <button onClick={startLogout}>Logout</button>
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
