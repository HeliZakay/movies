import React from 'react';
import {connect} from "react-redux";
import {showAuthPopup} from "../actions/auth";

export const Login =  ({showAuthPopup}) => (
    <div className="box-layout">
    <div className="box-layout__box">
        <h1 className="box-layout__title">Movies<span className="box-layout__title__with"> with </span>  Friends</h1>
        <p className="box-layout__text">See friends recommendations for movies</p>
        <button className="button" onClick={showAuthPopup}>Login with Google</button>
    </div>
        
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    showAuthPopup: () => dispatch(showAuthPopup())
});

export default connect(undefined, mapDispatchToProps)(Login);
