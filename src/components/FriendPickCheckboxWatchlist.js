import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {connect} from "react-redux";

const animatedComponents = makeAnimated();
export const FriendPickCheckbox =  (props) => {
    
    const optionsFriends = props.friends.map((friend) => {
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
          placeholder={props.language === "English"? "Select friends" : "למי תרצה לשלוח"}
          isSearchable
          isMulti
          onChange={handleChange}  
          closeMenuOnSelect={false}  
          components={animatedComponents}
      />
        </div>
     
    );
}
const mapStateToProps = (state) => ({
    language: state.auth.language,
    friends: state.friends.friends
});

export default connect(mapStateToProps)(FriendPickCheckbox);





























  
