import React from "react";
import {connect} from "react-redux";
import  {setPersonFilter, sortByDate, sortByScore, setTextFilter, setGenresFilter} from "../actions/filters";
import GenresCheckbox from "./GenresCheckbox";

export class MoviesListFilters extends React.Component {
    onMovieChange = (event) => {
        this.props.setTextFilter(event.target.value);
    };
    onPersonChange = (event) => {
        this.props.setPersonFilter(event.target.value);
    };
    onSortChange = (event) => {
        
        event.target.value === "date"?
        (this.props.sortByDate())
        : (this.props.sortByScore())
        
    };
    setGenresFilter = (genresArray) => {
        this.props.setGenresFilter(genresArray);
    }
    render() {
        return (
            <div className="content-container filters">
              <div className="genres-checkbox-container">
             <GenresCheckbox setGenresFilter={(genresArray) => this.setGenresFilter(genresArray)}/>
             </div>
                <div className="input-group">
              
                   
                    <input className="text-input input-group__item" 
                    type="text" 
                    placeholder={this.props.language === "English"? "filter by movie name": "סנן לפי שם סרט"}
                    value={this.props.filters.text}
                    onChange={this.onMovieChange}    
                    />
                   

                    
                    <input className="text-input input-group__item"
                    type="text" 
                     placeholder={this.props.language === "English"? "filter by recommender": "סנן לפי שם הממליץ"}
                     value={this.props.filters.person}
                      onChange={this.onPersonChange}    
                     />
                    
                   
                    <select className="select input-group__item"
                    value={this.props.filters.sortBy}
                     onChange ={this.onSortChange} 
                    >
                         <option value="date">{this.props.language === "English"? "Latest": "הכי חדשים"}</option>
                         <option value="score">{this.props.language === "English"? "Top Rated": "הניקוד הגבוה ביותר"}</option>
                     </select>
                    
                </div>
        </div>
        );
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters,
    language: state.auth.language
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (movieName) => dispatch(setTextFilter(movieName)),
    setPersonFilter: (person) => dispatch(setPersonFilter(person)),
    setGenresFilter: (genres) => dispatch(setGenresFilter(genres)),
    sortByDate: () => dispatch(sortByDate()),
    sortByScore: () => dispatch(sortByScore())
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesListFilters);