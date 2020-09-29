import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import moviesReducer from "../reducers/movies";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import watchListReducer from "../reducers/watchList";
import friendsReducer from "../reducers/friends";
import messagesReducer from "../reducers/message";
import friendsFilterReducer from "../reducers/friendsFilter";
import NotificationsReducer from "../reducers/notifications";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
    const store = createStore(
    combineReducers({
      movies: moviesReducer,
      filters: filtersReducer,
      auth: authReducer,
      watchList: watchListReducer,
      friends: friendsReducer,
      messages: messagesReducer,
      friendsFilter: friendsFilterReducer,
      notifications: NotificationsReducer         
    }),
    composeEnhancers(applyMiddleware(thunk))
     );
    return store;
};
  