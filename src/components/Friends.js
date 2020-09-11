import React from 'react';
import { connect } from "react-redux";
import {startSearchFriendInDB} from "../actions/friends";
import FriendCard from "./FriendCard";


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
    render() {
        return (
            <div className="friends">
             <div className="page-header">
                <div className="content-container">
                <h2 className="page-header__title">
                {this.props.language === "English"? " My Friends": "חברים"}
               </h2>
                </div>
                </div>
                
            <div className="content-container">
            
            
            <form onSubmit={this.onSubmit}>
                <input className="text-input friend-input"
                    type="email"
                    placeholder={this.props.language === "English"? "friend's email": "הכניסו את האימייל של החבר"}
                    autoFocus
                    value = {this.state.email}
                    onChange= {this.onEmailChange}
                />
                
                <button className="btn btn-primary button--add-friend btn-lg" type="submit">
                {this.props.language === "English"? " Add a friend": "הוסיפו את החבר/ה"}
               
                </button>
                {this.props.error && <p className="friends__error"><em>{this.props.error}</em></p>}
              </form>
              
              <h3 className="friends__subtitle">
              {this.props.language === "English"? " Your list of friends:": ":רשימת החברים"}
              
              </h3>
              
              
              {this.props.friends.length ===0 ? 
              <p className="friends__message">
              {this.props.language === "English"? " Add a friend!": "!הוסיפו חברים"}
              
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
        );
    };
};
    
const mapDispatchToProps = (dispatch) => ({
    startSearchFriendInDB: (email) => dispatch(startSearchFriendInDB(email)),
 });

 const mapStateToProps = (state) => ({
     friends: state.friends.friends,
     error: state.friends.error,
     language: state.auth.language
 });

 export default connect(mapStateToProps, mapDispatchToProps)(Friends);
