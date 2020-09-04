import React from "react";
import {connect} from "react-redux";
import  {setPersonFilter, sortByDate, sortByScore, setTextFilter} from "../actions/filters";

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
    render() {
        return (
            <div>
            <input 
            type="text" 
            placeholder="filter by movie name"
            value={this.props.filters.text}
            onChange={this.onMovieChange}    
            />
            <input 
            type="text" 
            placeholder="filter by recommender"
            value={this.props.filters.person}
            onChange={this.onPersonChange}    
            />
            <select 
            value={this.props.filters.sortBy}
            onChange ={this.onSortChange} 
            >
                <option value="date">Latest</option>
                <option value="score">Top Rated</option>
            </select>
        </div>
        );
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (movieName) => dispatch(setTextFilter(movieName)),
    setPersonFilter: (person) => dispatch(setPersonFilter(person)),
    sortByDate: () => dispatch(sortByDate()),
    sortByScore: () => dispatch(sortByScore())
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesListFilters);