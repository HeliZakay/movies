import React from 'react';
import {connect} from "react-redux";
import {showAuthPopup} from "../actions/auth";

export const Login =  ({showAuthPopup}) => (
    <div>
        <p>Log in to Movies</p>
        <button onClick={showAuthPopup}>Login</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    showAuthPopup: () => dispatch(showAuthPopup())
});

export default connect(undefined, mapDispatchToProps)(Login);
