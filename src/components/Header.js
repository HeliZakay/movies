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
    <h2 className="header__title greeting"><em>{language === "English"?
    ("Hi " + username.charAt(0).toUpperCase() + username.slice(1) ):
     (  username.charAt(0).toUpperCase() + username.slice(1)+ " היי" )}  </em>
    </h2>}
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
    <h2>{language === "English"? "Movies" : "דף הבית"}</h2>
    </NavLink>
   
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/messages" >
    <h2>{language === "English"? "Messages" : "הודעות"}</h2>
    <div className="onHoverBlue">
    <p 
    className={String(unreadMessagesCount > 0 && "header__unread-messaged-count")}>
    {unreadMessagesCount > 0 && unreadMessagesCount}
    </p>
    </div>
     </NavLink>
     <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/notifications" >
      <h2>{language === "English"? "Nofications" : "התראות"}</h2>
      <div className="onHoverBlue">
    <p 
    className={String(unreadNotificationsCount > 0 && "header__unread-messaged-count")}>
    {unreadNotificationsCount > 0 && unreadNotificationsCount}
    </p>
    </div>
      </NavLink>
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/watchList" > <h2>{language === "English"? "Watchlist" : "רשימת הצפייה שלי"}</h2></NavLink>
    <NavLink activeClassName="header__active-class" className="header__title not-visible" to="/friends" ><h2>{language === "English"? "Friends" : "חברים"}</h2> </NavLink>
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
