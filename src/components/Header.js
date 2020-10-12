import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";
import {countUnreadNotifications} from "../selectors/notifications";
import {countUnreadMessages} from "../selectors/messages";
import CustomizedMenus from "./StyledMenu";


export const Header = ({startLogout, username, language, unreadNotificationsCount, unreadMessagesCount}) => (
  <header className="header">
    <nav className="navbar navbar-dark bg-primary fixed-top header__custom-nav">
    <div className="header__wrapper">
    {username && 
    <h3 className="header__title greeting"><em>{language === "English"?
    ("Hi " + username.charAt(0).toUpperCase() + username.slice(1) ):
     (  username.charAt(0).toUpperCase() + username.slice(1)+ " היי" )}  </em>
    </h3>}
   {unreadMessagesCount > 0 && <div className="header__unread-notification">
   <Link to="./messages">
   <div className="onHoverBlue">
   <div className="header__wrapper">
    <p className={String(unreadMessagesCount > 0 && "header__unread-messaged-count")}>
    {unreadMessagesCount > 0 && unreadMessagesCount} </p>
    <p className="header__notification-text">
    <strong><em> {language === "English"? "messages": "הודעות"} </em></strong>
    </p>
    </div>
    </div>
   </Link>
   </div>}

   {unreadNotificationsCount > 0 && <div className="header__unread-notification">
   <Link to="./notifications">
   <div className="onHoverBlue">
   <div className="header__wrapper">
    <p className={String(unreadNotificationsCount > 0 && "header__unread-messaged-count")}>
    {unreadNotificationsCount > 0 && unreadNotificationsCount} </p>
    <p className="header__notification-text">
    <strong><em> {language === "English"? "notifications": "התראות"} </em></strong>
    </p>
    </div>
    </div>
   </Link>
   </div>}


   </div>
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/homePage">
    <h3>{language === "English"? "Movies" : "דף הבית"}</h3>
    </NavLink>
   
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/messages" >
    <h3>{language === "English"? "Messages" : "הודעות"}</h3>
    <div className="onHoverBlue">
    <p 
    className={String(unreadMessagesCount > 0 && "header__unread-messaged-count")}>
    {unreadMessagesCount > 0 && unreadMessagesCount}
    </p>
    </div>
     </NavLink>
     <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/notifications" >
      <h3>{language === "English"? "Nofications" : "התראות"}</h3>
      <div className="onHoverBlue">
    <p 
    className={String(unreadNotificationsCount > 0 && "header__unread-messaged-count")}>
    {unreadNotificationsCount > 0 && unreadNotificationsCount}
    </p>
    </div>
      </NavLink>
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/watchList" > <h3>{language === "English"? "Watchlist" : "רשימת הצפייה שלי"}</h3></NavLink>
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/friends" ><h3>{language === "English"? "Friends" : "חברים"}</h3> </NavLink>
    <button className="header__title button button--link not-visible" onClick={startLogout}>{language === "English"? "Logout" : "התנתק"}</button>
    <div className="header__menu">
    <CustomizedMenus language={language} />
    </div>
    </nav>
  </header>
);
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});
const mapStateToProps = (state) => ({
  username: state.auth.username,
  language: state.auth.language,
  unreadMessagesCount: countUnreadMessages(state.messages.messagesRecieved),
  unreadNotificationsCount: countUnreadNotifications(state.notifications),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
