import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";


export const SignupRoute = ({
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        
        isAuthenticated && doesHaveUsername ?
        <Redirect to="/homePage" /> :
        isAuthenticated? 
            <Component {...props} /> :
              <Redirect to="/" /> 
          
    )} 
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username
});

export default connect(mapStateToProps)(SignupRoute);