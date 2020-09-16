import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";
import {countUnreadMessages} from "../selectors/messages";

export const Header = ({startLogout, username, language, unreadMessagesCount}) => (
  <header className="header">
    <div className="content-container">
    <div className="header__content">
    {username && <h2 className="header__title greeting"><em>{language === "English"?
    ("Hi " + username.charAt(0).toUpperCase() + username.slice(1) ): (  username.charAt(0).toUpperCase() + username.slice(1)+ " היי" )}  </em></h2>}
    <NavLink activeClassName="header__active-class" className="header__title" to="/homePage">
    <h2>{language === "English"? "Movies" : "דף הבית"}</h2>
    </NavLink>
   
    {/* <NavLink to="/create" activeClassName="is-active">   Create Recommendation</NavLink>
    <br/> */}
    <NavLink activeClassName="header__active-class" className="header__title" to="/messages" >
    <h2>{language === "English"? "Messages" : "הודעות"}</h2>
    <div className="onHoverBlue">
    <p 
    className={String(unreadMessagesCount > 0 && "header__unread-messaged-count")}>
    {unreadMessagesCount > 0 && unreadMessagesCount}
    </p>
    </div>
     </NavLink>
    <NavLink activeClassName="header__active-class" className="header__title" to="/watchList" > <h2>{language === "English"? "Watchlist" : "רשימת הצפייה שלי"}</h2></NavLink>
    <NavLink activeClassName="header__active-class" className="header__title" to="/friends" ><h2>{language === "English"? "Friends" : "חברים"}</h2> </NavLink>
    <button className="header__title button button--link" onClick={startLogout}>{language === "English"? "Logout" : "התנתק"}</button>
    </div>
    </div>
  </header>
);
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});
const mapStateToProps = (state) => ({
  username: state.auth.username,
  language: state.auth.language,
  unreadMessagesCount: countUnreadMessages(state.messages.messagesRecieved)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
