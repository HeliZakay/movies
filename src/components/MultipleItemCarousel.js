import React, { Component, useState } from "react";
import Slider from "react-slick";
import {connect} from "react-redux";
import MovieDialog from "./MovieDialog";

const MultipleItemCarousel = (props) => {
  
  const settings = {    
    infinite: props.movies.length > 5,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 300
        }
      }
    ]};
  
    return (
      <div className={props.second? "multiple-item-carousel--second": "multiple-item-carousel"}>
      <h1 className={props.second? "multiple-item-carousel__header--second": "multiple-item-carousel__header"}>{props.header}</h1>
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
export default MultipleItemCarousel;