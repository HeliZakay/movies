import React from "react";
import {connect} from "react-redux";
import RecommendationForm from "./RecommendationForm";
import {editMovie, removeMovie} from "../actions/movies";

export class EditRecommendation extends React.Component {
    onSubmit = (movie) => {
        this.props.editMovie(this.props.movie.id, movie);
        this.props.history.push("/");
    };
    onRemove = () => {
        this.props.removeMovie({id: this.props.movie.id});
        this.props.history.push("/");
    };
    render() {
        return (
            <div>
                <RecommendationForm
                 movie={this.props.movie}
                 onSubmit = {this.onSubmit}
                 />
                 <button 
                    onClick={this.onRemove}
                    >
                    Remove</button>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    movie: state.movies.find((movie) => movie.id === props.match.params.id)  
});

const mapDispatchToProps = (dispatch, props) => ({
    editMovie: (id, movie) => dispatch(editMovie(id, movie)),
    removeMovie: (data) => dispatch(removeMovie(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditRecommendation);




// export class EditMovie extends React.Component {
//   onSubmit = (movie) => {
//     this.props.editMovie(this.props.movie.id, movie);
//     this.props.history.push('/');
//   };
//   onRemove = () => {
//     this.props.removeMovie({ id: this.props.movie.id });
//     this.props.history.push('/');
//   };
//   render() {
//     return (
//       <div>
//         <RecommendationForm
//           movie={this.props.movie}
//           onSubmit={this.onSubmit}
//         />
//         <button onClick={this.onRemove}>Remove</button>
//       </div>
//     );
//   }
// };

// const mapStateToProps = (state, props) => ({
//   movie: state.movies.find((movie) => movie.id === props.match.params.id)
// });

// const mapDispatchToProps = (dispatch, props) => ({
//   editMovie: (id, movie) => dispatch(editMovie(id, movie)),
//   removeMovie: (data) => dispatch(removeMovie(data))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);