import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";


export const LanguageRoute = ({
    language,
    flag,
    doesHaveUsername,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (


        isAuthenticated && doesHaveUsername && flag && !language ?
        (<Component {...props} />): (
            isAuthenticated && doesHaveUsername && flag && language?
            ( <Redirect to="/homePage" /> ) : (
                !isAuthenticated? ( <Redirect to="./" />) : (
                    isAuthenticated && flag && !doesHaveUsername ?
                    (<Redirect to="/signup" />) : (<LoadingPage />)
                )
            )
        )
        )  
    } 
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    doesHaveUsername: !!state.auth.username,
    flag: state.auth.flag,
    language: state.auth.language
});

export default connect(mapStateToProps)(LanguageRoute);