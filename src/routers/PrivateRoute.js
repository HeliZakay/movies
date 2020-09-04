import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import Header from '../components/Header';

export const PrivateRoute = ({
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        isAuthenticated && doesHaveUsername ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : isAuthenticated? (
            <Redirect to="/signup" />
        ):(
            <Redirect to="/" />
        )
        
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username
});

export default connect(mapStateToProps)(PrivateRoute);