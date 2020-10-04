import React, { Component, useState } from "react";
import Slider from "react-slick";
import {connect} from "react-redux";
import {getUnseenMovies} from "../selectors/movies";
import MovieDialog from "./MovieDialog";

export const UnseenMovies = (props) => {
  
  const settings = {
    centerMode: true,
    className: "center",
    centerPadding: "10px",
    infinite: true,
    speed: 1200,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]};
  
    return (
      <div className="unseen">
        <Slider {...settings}>
        {props.movies.map((movie) => {
          if(movie.imdbData && !movie.imdbData.Error)
            return(
              <MovieDialog key={movie.id} movie={movie}/>
             );
        })}
        </Slider>
      </div>
    );
}


const mapStateToProps = (state) => ({
    movies: getUnseenMovies(state.movies, state.auth.uid, state.watchList)
});
export default connect(mapStateToProps)(UnseenMovies);