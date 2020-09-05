import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import Header from '../components/Header';
import LoadingPage from "../components/LoadingPage";

export const PrivateRoute = ({
    flag,
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
        ) : isAuthenticated && flag ? (
            <Redirect to="/signup" />
        ): isAuthenticated? 
            <LoadingPage />:
        (
            <Redirect to="/" />
        )
        
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username,
    flag: state.auth.flag
});

export default connect(mapStateToProps)(PrivateRoute);