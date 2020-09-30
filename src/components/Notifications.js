import React, {useState} from "react";
import {connect} from "react-redux";
import NotificationCard from "./NotificationCard";
import {startDeleteNotification} from "../actions/notifications";
import {sortByDate} from "../selectors/notifications";
import Dialog from "./Dialog";
import {findMovie} from "../selectors/movies";

const Notifications = (props) => {
    const onDelete = (notificationId, userId) => {
            props.startDeleteNotification({
                notificationId,
                userId
            });
    };
    const showDialog = () => {
        setDialog(true);
    }
    return (
        <div className={String(props.language !== "English" && "align-right")}>
        <div className="content-container margin">
        {props.notifications.length === 0 && <p className="friends__message">
            {props.language === "English"? "No notifications": "אין התראות חדשות"}
        </p>}
        <div className="row">
        {props.notifications.map((notification) => {
            return <div key={notification.id} className=" col-sm-12 col-md-6 col-lg-4">
            <NotificationCard 
            showDialog={showDialog} 
            onDelete={onDelete} 
            notification={notification}
            movie={findMovie(props.movies, notification.movieName, notification.personName, props.uid, notification.type)}
            />
            </div>
        })} 
        </div>
        </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
    startDeleteNotification: (data)=> dispatch(startDeleteNotification(data))
})
const mapStateToProps = (state) => ({
    notifications: sortByDate(state.notifications),
    language: state.auth.language,
    movies: state.movies,
    uid: state.auth.uid
});
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

