import React from "react";
import {connect} from "react-redux";

export class MovieInfo extends React.Component {
    render() {
       const id = "#"+this.props.movieId;
        return (
            <div className="movie-info">
            {this.props.language === "English"? 
            (<div>
                <p>
            <a className="btn btn-primary" data-toggle="collapse" href={id} role="button" aria-expanded="false" aria-controls={id}>
              Movie Info
            </a>
            </p>
            <div className="collapse" id={this.props.movieId}>
            <div className="card card-body movie-info__card">
            <p><strong>Year</strong>: {this.props.movieInfoImdb.Year}</p>
            <p><strong>Genre</strong>: {this.props.movieInfoImdb.Genre}</p>
            <p><strong>Summary</strong>: {this.props.movieInfoImdb.Plot}</p>
            <p><strong>Actors</strong>: {this.props.movieInfoImdb.Actors}</p>
            </div>
            </div>
            </div>)
            :(
                <div>
                <p>
            <a className="btn btn-primary" data-toggle="collapse" href={id} role="button" aria-expanded="false" aria-controls={id}>
              עוד מידע על הסרט
            </a>
            </p>
            <div className="collapse" id={this.props.movieId}>
            <div className="card card-body movie-info__card">
            <p><strong>שנה</strong>: {this.props.movieInfoImdb.Year}</p>
            <p><strong>ז'אנר</strong>: {this.props.movieInfoImdb.Genre}</p>
            <p><strong>תקציר</strong>: {this.props.movieInfoImdb.Plot}</p>
            <p><strong>שחקנים</strong>: {this.props.movieInfoImdb.Actors}</p>
            </div>
            </div>
            </div>
            )}

            </div>       
        );
    };
};

const mapStateToProps = (state) => ({
    language: state.auth.language
});
export default connect(mapStateToProps)(MovieInfo);

