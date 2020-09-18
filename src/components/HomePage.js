import React from 'react';
import MoviesList from "./MoviesList";
import Actions from "./Actions";
import Open from "./Open";
import MoviesListFilters from "./MoviesListFilters";
import {connect} from "react-redux";
import {addFriendsToDB} from "../actions/friends.js";
// import {addMe} from "../actions/friends.js";
// import {unifyReviews} from "../actions/movies";
import ShanaTova from "./ShanaTova";
import MoviesCarousel from "./MoviesCarousel";

export const HomePage = (props) => (
  <div className={String(props.language !== "English" && "align-right")}>
    {/* <Open /> */}
    <ShanaTova />
    <MoviesCarousel />
    <Actions />   
    {/* <button onClick={addFriendsToDB}>addFriendsToDB</button> */}
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
  uid: state.auth.uid
});

export default connect(mapStateToProps)(HomePage);
