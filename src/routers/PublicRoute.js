import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

export const PublicRoute = ({
    flag,
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        
        isAuthenticated && doesHaveUsername ? (
            <Redirect to="/homePage" />
            
        ) : isAuthenticated && flag ? (
            <Redirect to="/signup" />
        ) : isAuthenticated? 
            <LoadingPage />:
         (
            <Component {...props} />      
        )
    )} 
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username,
    flag: state.auth.flag
    
});

export default connect(mapStateToProps)(PublicRoute);