import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {connect} from "react-redux";
import https from "https";

function MoviesCarousel(props)
{
  const items = props.items;
    return (
        <div className="page">
         <Carousel
        className="movie-carousel"
        animation="fade"
        navButtonsAlwaysVisible={true}
        timeout={500} 
        interval={5000} 
       >
            {  
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </div>
    )
}
 
class Item extends React.Component 
{
 
    produceImage = (imdbPoster) => {
        const imgName = this.props.item.movieName.split(" ")[0].toLowerCase();  
        try {
            require(`../../public/images/${imgName}.jpg`); 
            return <img className="movie-carousel-item__movie-image" src={`images/${imgName}.jpg`}></img>;
        }     
        catch(err) {
            if (imdbPoster) {
                return <img className="movie-carousel-item__movie-image" src={imdbPoster}></img>;
            }
        }
    }
    render () {
        return (
            <div className="movie-carousel__item">
                 <h2 className="movie-carousel__header">{this.props.item.header}</h2>
                 <h4 className="movie-carousel__score">Score: {this.props.item.score}</h4>
                 <p className="movie-carousel__content">{this.props.item.content.length <= 200? this.props.item.content: this.props.item.content.slice(0,200)+"..." }</p>
                 {this.produceImage(this.props.item.imdbPoster)}
             </div> 
            
         );
    }
}

export default MoviesCarousel;











































// import React from "react";
// import { connect } from "react-redux";
// import MovieCardCarousel from "./MovieCardCarousel";


// export class MoviesCarousel extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
            
//         }
//     }
//     render() {
//         return (
//           <div className="colored-section" id="testimonials">
//     <div id="testemonial-carousel" className="carousel slide" data-ride="false">
//       <div className="carousel-inner">

//         <div className="carousel-item active container-fluid">
//         <MovieCardCarousel 
//         className="movie-carousel__card"
//         className={this.props.language !== "English" && "align-right"}
//         review = {this.props.movies[1].reviews[0]}
//         id={this.props.movies[1].id}
//         movieName={this.props.movies[1].movieName}
//       />
//           <h2 className="testemonial-text"></h2>
//         </div>
//         <div className="carousel-item container-fluid">
//           <h2 className="testimonial-text"></h2>
//           <MovieCardCarousel
//         className={this.props.language !== "English" && "align-right"}
//         review = {this.props.movies[2].reviews[0]}
//         id={this.props.movies[2].id}
//         movieName={this.props.movies[2].movieName}
//       />
//         </div>
//         <div className="carousel-item container-fluid">
//           <h2 className="testimonial-text"></h2>
//           <MovieCardCarousel
//         className={this.props.language !== "English" && "align-right"}
//         review = {this.props.movies[22].reviews[0]}
//         id={this.props.movies[22].id}
//         movieName={this.props.movies[22].movieName}
//       />
//         </div>
//         <div className="carousel-item container-fluid">
//           <h2 className="testimonial-text"></h2>
//           <MovieCardCarousel
//         className={this.props.language !== "English" && "align-right"}
//         review = {this.props.movies[29].reviews[0]}
//         id={this.props.movies[29].id}
//         movieName={this.props.movies[29].movieName}
//       />
//         </div>
//         <div className="carousel-item container-fluid">
//           <h2 className="testimonial-text"></h2>
//           <MovieCardCarousel
//         className={this.props.language !== "English" && "align-right"}
//         review = {this.props.movies[30].reviews[0]}
//         id={this.props.movies[30].id}
//         movieName={this.props.movies[30].movieName}
//       />
//         </div>
//         <div className="carousel-item container-fluid">
//           <h2 className="testimonial-text"></h2>
//           <MovieCardCarousel
//         className={this.props.language !== "English" && "align-right"}
//         review = {this.props.movies[39].reviews[0]}
//         id={this.props.movies[39].id}
//         movieName={this.props.movies[39].movieName}
//       />
//         </div>
        
//       </div>
//       <a className="carousel-control-prev" href="#testemonial-carousel" role="button" data-slide="prev">
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="sr-only">Previous</span>
//       </a>
//       <a className="carousel-control-next" href="#testemonial-carousel" role="button" data-slide="next">
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="sr-only">Next</span>
//       </a>
//     </div>



//   </div>
           
// //  <div id="movieCarousel" className=" carousel slide movie-carousel" data-ride="carousel">
            
// //             <div className="carousel-inner movie-carousel__inner ">
// //   <div className="carousel-item movie-carousel__item active">
  
// //   <MovieCardCarousel
// //         className={this.props.language !== "English" && "align-right"}
// //         review = {this.props.movies[43].reviews[0]}
// //         id={this.props.movies[43].id}
// //         movieName={this.props.movies[43].movieName}
// //       />
      
// //     </div>
// //     <div className="carousel-item movie-carousel__item">
// //     <MovieCardCarousel 
// //         className="movie-carousel__card"
// //         className={this.props.language !== "English" && "align-right"}
// //         review = {this.props.movies[1].reviews[0]}
// //         id={this.props.movies[1].id}
// //         movieName={this.props.movies[1].movieName}
// //       />
// //     </div>
// //     <div className="carousel-item movie-carousel__item">
// //     <MovieCardCarousel
// //         className={this.props.language !== "English" && "align-right"}
// //         review = {this.props.movies[2].reviews[0]}
// //         id={this.props.movies[2].id}
// //         movieName={this.props.movies[2].movieName}
// //       />
// //     </div>
  
// //   </div>
// //   <a className="carousel-control-prev movie-carousel__control" href="#movieCarousel" role="button" data-slide="prev">
// //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
// //     <span className="sr-only">Previous</span>
// //   </a>
// //   <a className="carousel-control-next movie-carousel__control" href="#movieCarousel" role="button" data-slide="next">
// //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
// //     <span className="sr-only">Next</span>
// //   </a>
// // </div>
           
           
// //         );
// //     }
// )}
// }

// const mapStateToProps = (state) => ({
//     movies: state.movies,
//     language: state.auth.language
// })
// export default connect(mapStateToProps)(MoviesCarousel);