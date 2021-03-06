import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import Header from '../components/Header';
import LoadingPage from "../components/LoadingPage";

export const PrivateRoute = ({
    language,
    flag,
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (

        
        isAuthenticated && doesHaveUsername && flag && !language ?
        (<Redirect to="./language" />): (
            isAuthenticated && doesHaveUsername && flag && language?
            ( <div>
                <Header />
                <Component {...props} />
            </div> ) : (
                !isAuthenticated? ( <Redirect to="./" />) : (
                    isAuthenticated && flag && !doesHaveUsername ?
                    (<Redirect to="/signup" />) : (<LoadingPage />)
                )
            )
        )
            
         
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username,
    flag: state.auth.flag,
    language: !!state.auth.language
});

export default connect(mapStateToProps)(PrivateRoute);