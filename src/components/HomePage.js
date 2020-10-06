import React from 'react';
import MoviesList from "./MoviesList";
import Actions from "./Actions";
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
import UnseenMovies from "./UnseenMovies";


export const HomePage = (props) => (
 
  <div className={String(props.language !== "English" && "align-right")}>
 
   <Actions />
    {/* <Open /> */}
    {/* <ShanaTova /> */}
   {/* <TestForm /> */}
    {/* <button onClick={addFriendsToDB}>addFriendsToDB</button> */}
   <UnseenMovies />
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
  })
});


export default connect(mapStateToProps)(HomePage);
