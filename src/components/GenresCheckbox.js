import React, {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {connect} from "react-redux";
import {setGenresFilter} from "../actions/filters";
// import { colourOptions } from '../data';

const optionsGenres = [
    { value: "Action", label: "Action"},
    { value: "Adventure", label: "Adventure"},
    { value: "Animation", label: "Animation"},
    { value: "Biography", label: "Biography"},
    {value: "Comedy", label: "Comedy"},
    { value: "Crime", label: "Crime"},
    { value: "Documentary", label: "Documentary"},
    { value: "Drama", label: "Drama"},
    { value: "Family", label: "Family"},
    { value: "Fantasy", label: "Fantasy"},
    { value: "History", label: "History"},
    { value: "Horror", label: "Horror"},
    { value: "Musical", label: "Musical"},
    { value: "Mystery", label: "Mystery"},
    { value: "Romance", label: "Romance"},
    { value: "Sci-Fi", label: "Sci-Fi"},
    { value: "Thriller", label: "Thriller"},
    { value: "War", label: "War"}    
];

const animatedComponents = makeAnimated();

export default (props) => {
    // const [genres, setGenres] = useState([]);
    
    const handleChange = (event) => {
        let genresArray = [];
        if (event) {
            genresArray = event.map((genre) => {
                return genre.value;
            });
        }
        props.setGenresFilter(genresArray);
    }

    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                // primary25: 'orange',
                primary: 'dark-grey'
            }
        };
    }


  return (
      <div className="genres-checkbox">
         <Select
        options={optionsGenres}
        theme={customTheme}
        className="mb-3"
        placeholder="Select Genres"
        isSearchable
        isMulti
        autoFocus
        onChange={handleChange}
    //   closeMenuOnSelect={false}
      components={animatedComponents}
    //   defaultValue={[colourOptions[4], colourOptions[5]]}
     
    />
      </div>
   
  );
}

