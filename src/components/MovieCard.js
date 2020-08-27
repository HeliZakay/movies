import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";

const MovieCard = ({id, movieName, personName, score, content, createdAt}) => (
        <div>
            <Link to={`/edit/${id}`}><h3>Movie: {movieName}</h3></Link>
            <p>Recommender: {personName}</p>
            <p>Score: {score}</p>
            <p>Content: {content}</p>      
            <p>Created At: {moment(createdAt).format("MMMM D, YYYY")}</p>    
            
        </div>
);

export default MovieCard;