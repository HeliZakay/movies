import React from "react";
import {connect} from "react-redux";
import  {setPersonFilter, sortByDate, sortByScore, setTextFilter} from "../actions/filters";

const MoviesListFilters = (props) => (
    <div>
        <input 
        type="text" 
        placeholder="filter by movie name"
        value={props.filters.text}
        onChange={(event) => {
            props.dispatch(setTextFilter(event.target.value));
        }}    
        />
        <input 
        type="text" 
        placeholder="filter by recommender"
        value={props.filters.person}
        onChange={(event) => {
            props.dispatch(setPersonFilter(event.target.value));
        }}    
        />
        <select 
        value={props.filters.sortBy}
        onChange ={(event) => {
            event.target.value === "date"?
            props.dispatch(sortByDate())
            : props.dispatch(sortByScore())
        }} 
        >
            <option value="date">Latest</option>
            <option value="score">Top Rated</option>
        </select>
    </div>

);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(MoviesListFilters);