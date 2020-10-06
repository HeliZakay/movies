import React from 'react';
import {connect} from "react-redux";
import Select from 'react-select';

export const FriendPickCheckbox = (props) => {
    const options = props.friends.map((friend) => {
        return {value: friend, label: friend.username}
    });
    return (
        <Select
    
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    
  />
    );
};
const mapStateToProps = (state) => ({
    friends: state.friends.friends,
});

export default connect(mapStateToProps)(FriendPickCheckbox);
