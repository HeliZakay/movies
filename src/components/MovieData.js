import React from "react";
import {connect} from "react-redux";
import MovieInfo from "./MovieInfo";


export class MovieData extends React.Component {
    render() {
        return (
            <div 
                className="movie-data">
                 <h3 className="movie-data__text">
                 {this.props.language === "English"? "Average Score: ": " ציון ממוצע: "}
                 <strong>
                 {this.props.averageScore}
                 </strong></h3>
                 <h3 className="movie-data__sub-text">
                 ({this.props.reviewsCount}  
                 {this.props.reviewsCount > 1 ? (this.props.language === "English"? " reviews": " ביקורות "): (this.props.language === "English"? " review": " ביקורת ")})
                 </h3>
                 {this.props.movieInfoImdb && !this.props.movieInfoImdb.Error  && <MovieInfo 
                 movieInfoImdb={this.props.movieInfoImdb}
                 movieName={this.props.movieName}
                 movieId={this.props.movieId}
                 />}
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    language: state.auth.language
});
export default connect(mapStateToProps)(MovieData);

