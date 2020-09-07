import React from 'react';
import { connect } from "react-redux";
import {startSearchFriendInDB} from "../actions/friends";
import FriendCard from "./FriendCard";

export class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
        }
    }
    onEmailChange =(event) => {
        const email = event.target.value;
        this.setState( () => ({email}));
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.startSearchFriendInDB(this.state.email);
        this.props.history.push("/friends");
    };
    render() {
        return (
            <div className="friends">
             <div className="page-header">
                <div className="content-container">
                <h2 className="page-header__title">My Friends</h2>
                </div>
                </div>
               
               
            <div className="content-container">
            <form onSubmit={this.onSubmit}>
                <input className="text-input friend-input"
                    type="email"
                    placeholder="friend's email"
                    autoFocus
                    value = {this.state.email}
                    onChange= {this.onEmailChange}
                />
                
                <button className="btn btn-primary button--add-friend btn-lg" type="submit">Add a friend</button>
                {this.props.error && <p className="friends__error"><em>{this.props.error}</em></p>}
              </form>
              
              <h3 className="friends__subtitle">Your list of friends:</h3>
              
              {this.props.friends.length ===0 ? 
              <p className="friends__message">Add a friend!</p>
              : 
                  <div className="row">
                  {this.props.friends.map((friendObject) => 
                  <div key={friendObject.userId} className=" col-sm-12 col-md-12 col-lg-12">
                    <FriendCard  {...friendObject}/>
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
     error: state.friends.error
 });

 export default connect(mapStateToProps, mapDispatchToProps)(Friends);







// import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";



// export class MovieCard extends React.Component {
//     onAddOrRemoveFromWatchList = () => {
//         (isMovieOnWatchList(this.props.watchList, this.props.id))? 
//         this.props.startRemoveMovieFromWatchList(this.props.id):
//         this.props.startAddMovieToWatchList(this.props.id);
//     };
//     render() {
//         return (
//             <div>
//             {this.props.userUid === this.props.currentUserUid ? (
//                 <Link to={`/edit/${this.props.id}`}><h3>Movie: {this.props.movieName}</h3></Link>
//             ): (
//                 <h3>Movie: {this.props.movieName}</h3>
//             )}
//             {/* <p>Recommender: {this.props.personName}</p> */}
//             <p>Score: {this.props.score}</p>
//             <p>Content: "{this.props.content}"</p>      
//             <p>Created At: {moment(this.props.createdAt).format("MMMM D, YYYY")}</p> 
//             <button onClick={this.onAddOrRemoveFromWatchList}>
//             {(isMovieOnWatchList(this.props.watchList, this.props.id)) ? "Remove from my watching list": "Add to my watching List!"}
//             </button>  
//         </div>
//         );
//     };
// };


