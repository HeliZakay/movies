import React from 'react';
import {connect} from "react-redux";
import {showAuthPopup} from "../actions/auth";

export const Login =  ({showAuthPopup}) => (
    <div className="box-layout">
    <div className="box-layout__bg"></div>
    <div className="box-layout__box">
        <h1 className="box-layout__title">Movies Chat</h1>
        <p className="box-layout__text">Chat with people and see friends recommendations for movies</p>
        <button className="button" onClick={showAuthPopup}>Login with Google</button>
    </div>
        
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    showAuthPopup: () => dispatch(showAuthPopup())
});

export default connect(undefined, mapDispatchToProps)(Login);
