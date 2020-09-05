import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import AppRouter, {history} from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import "./firebase/firebase";
import { startSetMovies } from "./actions/movies";
import { startSetWatchListMovies } from "./actions/watchList";
import {firebase} from "./firebase/firebase";
import {startLogin, logout} from "./actions/auth";
import {startSetFriends} from "./actions/friends";
import {startSetUserDetails} from "./actions/auth";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        return store.dispatch(startLogin(user)).then(() => {
            return store.dispatch(startSetMovies()).then(()=> {
                return store.dispatch(startSetWatchListMovies()).then(() => {
                    return store.dispatch(startSetFriends()).then(() => {
                        return store.dispatch(startSetUserDetails()).then(()=> {
                            renderApp();
                        });  
                    });
                });
            });
        }); 
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});
