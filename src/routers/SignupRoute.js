import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";


export const SignupRoute = ({
    flag,
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        
        isAuthenticated && doesHaveUsername ?
        <Redirect to="/homePage" /> :
        isAuthenticated && flag? 
            <Component {...props} /> :
            isAuthenticated? <LoadingPage />:
              <Redirect to="/" /> 
          
    )} 
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username,
    flag: state.auth.flag
});

export default connect(mapStateToProps)(SignupRoute);