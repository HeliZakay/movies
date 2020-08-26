import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import {addMovie} from "./actions/movies";
import {setTextFilter, setPersonFilter, sortByScore} from "./actions/filters";
import getVisibleMovies from "./selectors/movies";

const store = configureStore();
store.dispatch(addMovie({ createdAt: -100, movieName: "Tarazan", score: 10, personName:"Heli", content: "Great Disney movie. It's pretty good you should probably watch"}));
store.dispatch(addMovie({ createdAt: 20, movieName: "Mulan", score:9, personName:"Heli", content: "I really loved this movie when I was little, it is quite magical"}));
store.dispatch(addMovie({ movieName: "Paycheck", score:9, content: "I personally really love this movie. It is very interesting"}));
store.dispatch(addMovie({ createdAt:-200, movieName: "The boy next door", personName:"Oz", score:6, content: "Even though this movie is listed as \"Sexy\" there are not many \"Sexy\" scenes. This movie is more scary than sexy"}));
console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
