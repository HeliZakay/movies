import React from "react";
import {connect} from "react-redux";

export const ListHeading = (props) => {
    return (
        <div className="list-heading">
        <div className="list-heading__text">
            <h2>{props.language === "English" ? "Movies recommended by friends" : "סרטים שהחברים המליצו"}</h2>
            <p className="list-heading__paragraph">{props.language === "English" ? "Take a look at your friends' recommendations!" : "הסתכלו על המלצות הסרטים של החברים!"}</p>
        </div>
            
        </div>
        
       
    );
};

const mapStateToProps = (state) => ({
    language: state.auth.language
  });
  
  export default connect(mapStateToProps)(ListHeading);
  
