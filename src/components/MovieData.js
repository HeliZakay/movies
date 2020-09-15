import React from "react";

export default class MovieData extends React.Component {
    render() {
        return (
            <div 
                className="movie-data">
                 <h3 className="movie-data__text">Average Score: <strong>
                 {this.props.averageScore}
                 </strong></h3>
                 <h3 className="movie-data__sub-text">({this.props.reviewsCount}  
                 {this.props.reviewsCount > 1 ? " reviews": " review"})</h3>
            </div>
        );
    };
};


