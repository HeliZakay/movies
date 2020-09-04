import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";


export const PublicRoute = ({
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        
        isAuthenticated && doesHaveUsername ? (
            <Redirect to="/homePage" />
            
        ) : isAuthenticated? (
            <Redirect to="/signup" />
        ) : (
            <Component {...props} />      
        )
    )} 
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username
    
});

export default connect(mapStateToProps)(PublicRoute);