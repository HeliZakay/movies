import React from 'react';
import { connect } from "react-redux";
import {startSearchFriendInDB} from "../actions/friends";
import {setNameFilter} from "../actions/friendsFilter";
import FriendCard from "./FriendCard";
import {getVisibleFriends} from "../selectors/friends";

export class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:""
        }
    }        
    onEmailChange =(event) => {
        const email = event.target.value;
        this.setState( () => ({email}));
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.startSearchFriendInDB(this.state.email.toLowerCase());
        this.props.history.push("/friends");
    };
    onNameChange = (event) => {
        this.props.setNameFilter(event.target.value);
    };
    render() {
        return (
            <div className="page">
            <div className={String(this.props.language !== "English" ? "align-right friends": "friends")}>
             {/* <div className="page-header">
                <div className="content-container">
                <h2 className="page-header__title">
                {this.props.language === "English"? " My Friends": "חברים"}
               </h2>
                </div>
                </div> */}
                
            <div className="content-container">
            
            
            <form onSubmit={this.onSubmit}>
                <input className="text-input friend-input"
                    type="email"
                    placeholder={this.props.language === "English"? "friend's email": "הכניסו את האימייל של החבר"}
                    value = {this.state.email}
                    onChange= {this.onEmailChange}
                />
                
                <button className="btn btn-primary button--add-friend btn-lg" type="submit">
                {this.props.language === "English"? " Add a friend": "הוסיפו את החבר/ה"}
               
                </button>
                {this.props.error && <p className="friends__error"><em>{this.props.error}</em></p>}
              </form>
              <div className="friends__filters">
              <label className="friends__search-label">{this.props.language === "English"? "Search a friend by username or email:": "  חיפוש חבר לפי כינוי או אימייל"}</label>
              <br/>
              <input className="text-input friend-search-input"
                    type="text"
                    placeholder={this.props.language === "English"? "friend's username or email": " הכניסו את שם החבר או האימייל"}
                    autoFocus
                    value = {this.props.name}
                    onChange= {this.onNameChange}
                />
                </div>            
              {this.props.friends.length ===0 ? 
              <p className="friends__message">
              {this.props.language === "English"? " Add a friend!": "הוסיפו חברים!"}
              
              </p>
              : 
                  <div className="row">
                  {this.props.friends.map((friendObject) => 
                  <div key={friendObject.userId} className=" col-sm-12 col-md-6 col-lg-4">
                    <FriendCard friendObj = {friendObject}/>
                    </div>
                )
              }
              </div>
              }
              </div>  
         </div>
         </div>
        );
    };
};
    
const mapDispatchToProps = (dispatch) => ({
    startSearchFriendInDB: (email) => dispatch(startSearchFriendInDB(email)),
    setNameFilter: (name) => dispatch(setNameFilter(name))
 });

 const mapStateToProps = (state) => ({
     friends: getVisibleFriends(state.friends.friends, state.friendsFilter),
     error: state.friends.error,
     language: state.auth.language,
     name: state.friendsFilter
 });

 export default connect(mapStateToProps, mapDispatchToProps)(Friends);
