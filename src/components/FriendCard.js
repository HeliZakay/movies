import React from "react";

const FriendCard = (props) => {
    return (
        <div className="card bg-light mb-3 custom-card--friend">
       
        <h3 className="card-header custom-card-header"> {props.username}</h3>
        <div className="card-body">
        <div className="custom-card__card-content">
        <p className="card-title">{props.email}</p>
        <button className="btn button-friend btn-warning btn-lg">Send {props.username} a recommendation </button>
        </div>
        </div>
        </div>
      
    );
};

export default FriendCard;
    



