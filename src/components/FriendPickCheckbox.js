import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {connect} from "react-redux";
import {didIRecommendMovieToFriend} from "../selectors/messages";
import {didFriendReviewedMovie} from "../selectors/movies";

const animatedComponents = makeAnimated();
export const FriendPickCheckbox =  (props) => {
    
    const optionsFriends = props.friends.filter((friend) => {
        return !didIRecommendMovieToFriend(props.recommendations, props.movie.id, friend.userId) &&
        !didFriendReviewedMovie(props.movie.reviews, friend.userId);
    }).map((friend) => {
        return {value: friend.userId, label: friend.username}
    });
    const handleChange = (event) => {
        let friendsArray = [];
        if (event) {
            friendsArray = event.map((friend) => {
                return friend.value;
            });
        }
        props.handleChange(friendsArray);
}

    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary: 'dark-grey'
            }
        };
    }
    return (
        <div className="genres-checkbox">
           <Select
          options={optionsFriends}
          theme={customTheme}
          className="mb-3"
          placeholder={props.language === "English"? "Select friends" : "למי תרצה להמליץ"}
          isSearchable
          isMulti
          onChange={handleChange}    
          components={animatedComponents}
      />
        </div>
     
    );
}
const mapStateToProps = (state) => ({
    language: state.auth.language,
    friends: state.friends.friends,
    recommendations: state.messages.recommendations
});

export default connect(mapStateToProps)(FriendPickCheckbox);





























  
