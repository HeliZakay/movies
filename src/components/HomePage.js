import React from 'react';
import MoviesList from "./MoviesList";
import Actions from "./Actions";
import PrettyAction from "./PrettyAction";
import Open from "./Open";
import MoviesListFilters from "./MoviesListFilters";
import {connect} from "react-redux";
import {addFriendsToDB} from "../actions/friends.js";
import ShanaTova from "./ShanaTova";
import MoviesCarousel from "./MoviesCarousel";
import {getCarouselItems} from "../selectors/carousel";
import TestForm from "./TestForm";
import TestApi from "./TestApi";
import {moveMichalsReview} from "../actions/movies";
import MultipleItemCarousel from "./MultipleItemCarousel";
import {getUnseenMovies, getMyMovies} from "../selectors/movies";
import {deleteUsers} from "../actions/friends";
import {findNewUsers} from "../actions/friends";

export const HomePage = (props) => (
  <div className={String(props.language !== "English" && "align-right")}>
  <PrettyAction />
   {/* <Actions /> */}
    {/* <Open /> */}
    {/* <ShanaTova /> */}
   {/* <TestForm /> */}
    {/* <button onClick={addFriendsToDB}>addFriendsToDB</button> */}
    {/* <button onClick={findNewUsers}>Find New Users</button> */}
    {/* <button onClick={deleteUsers}>Delete Users</button> */}
   <MultipleItemCarousel 
   movies={props.unseenMovies} 
   header={props.language=="English"?
    "Did You See Any of These? Time to Rate!":
     "כבר ראיתם? זה הזמן לתת ציון"}/>
    <hr className="multuple-carousel-hr"/>
   {props.myMovies.length > 0 && <MultipleItemCarousel 
   second={true}
   movies={props.myMovies}
   header={props.language=="English"?
    "Recommend Movies You Like to Friends":
     "המליצו לחברים על סרטים שראיתם ואהבתם"}
   />}
    {props.items.length > 0 && <MoviesCarousel items={props.items}/>}
  {/* <button onClick={moveMichalsReview}>moveMichalsReview</button> */}
    {/* <TestApi /> */}
    {/* <button onClick={addMe}>addMe</button> */}
    {/* <button onClick={unifyReviews}>Unify Reviews</button> */}
    <div className="movie-list-section">
    <MoviesListFilters />
    <MoviesList />
    </div>
  </div>
 
);

const mapStateToProps = (state) => ({
  language: state.auth.language,
  uid: state.auth.uid,
   items: getCarouselItems({
      friends: state.friends.friends, 
      movies: state.movies, 
      watchlist: state.watchList,
      uid: state.auth.uid,
      language: state.auth.language
  }),
  unseenMovies: getUnseenMovies(state.movies, state.auth.uid, state.watchList),
  myMovies: getMyMovies(state.movies, state.auth.uid)
});



export default connect(mapStateToProps)(HomePage);
