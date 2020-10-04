import React, {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {connect} from "react-redux";
import {setGenresFilter} from "../actions/filters";

const genreDict = {
    "Action": "פעולה",
    "Adventure": "הרפתקאות",
    "Animation": "אנימציה",
    "Biography": "ביוגרפי",
    "Comedy": "קומדיה",
    "Crime": "פשע",
    "Documentary": "דוקומנטרי",
    "Drama": "דרמה",
    "Family": "המשפחה",
   "Fantasy": "פנטזיה",
   "History": "היסטוריה", 
    "Horror": "אימה", 
    "Musical": "מוזיקלי",
    "Mystery": "תעלומה",
    "Romance":"רומנטיקה", 
    "Sci-Fi": "מדע בדיוני",
    "Thriller": "מתח",
    "War": "מלחמה"
}
const animatedComponents = makeAnimated();

export const GenresCheckbox =  (props) => {
    
const optionsGenres = [
    { value: "Action", label: props.language === "English"? "Action": genreDict["Action"]},
    { value: "Adventure", label: props.language === "English"? "Adventure": genreDict["Adventure"] },
    { value: "Animation", label: props.language === "English"?  "Animation": genreDict["Animation"]},
    { value: "Biography", label: props.language === "English"?  "Biography": genreDict["Biography"] },
    {value: "Comedy", label: props.language === "English"?   "Comedy": genreDict["Comedy"]},
    { value: "Crime", label: props.language === "English"?  "Crime": genreDict["Crime"] },
    { value: "Documentary", label: props.language === "English"?  "Documentary": genreDict["Documentary"] },
    { value: "Drama", label: props.language === "English"?  "Drama": genreDict["Drama"] },
    { value: "Family", label: props.language === "English"?  "Family": genreDict["Family"] },
    { value: "Fantasy", label: props.language === "English"?  "Fantasy": genreDict["Fantasy"] },
    { value: "History", label: props.language === "English"?  "History": genreDict["History"] },
    { value: "Horror", label: props.language === "English"?  "Horror": genreDict["Horror"] },
    { value: "Musical", label: props.language === "English"?  "Musical": genreDict["Musical"] },
    { value: "Mystery", label: props.language === "English"?  "Mystery": genreDict["Mystery"] },
    { value: "Romance", label: props.language === "English"?  "Romance": genreDict["Romance"] },
    { value: "Sci-Fi", label: props.language === "English"?  "Sci-Fi": genreDict["Sci-Fi"] },
    { value: "Thriller", label: props.language === "English"?  "Thriller": genreDict["Thriller"] },
    { value: "War", label: props.language === "English"?  "War": genreDict["War"] }    
];
    
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
        placeholder={props.language === "English"? "Select Genres" : "סינון לפי ז'אנר"}
        isSearchable
        isMulti
        onChange={handleChange}
    //   closeMenuOnSelect={false}
      components={animatedComponents}
    //   defaultValue={[colourOptions[4], colourOptions[5]]}
     
    />
      </div>
   
  );
}
const mapStateToProps = (state) => ({
    language: state.auth.language
});

export default connect(mapStateToProps)(GenresCheckbox);

