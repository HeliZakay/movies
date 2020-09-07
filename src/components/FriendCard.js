import React from "react";

const FriendCard = (props) => {
    return (
        <div className="card card bg-light mb-3 custom-card">
       
        <h3 className="card-header custom-card-header"> {props.username}</h3>
        <div className="card-body">
        <div className="custom-card__card-content">
        <p className="card-title">{props.email}</p>
        </div>
        </div>
        </div>
      
    );
};

export default FriendCard;
    



