import React from "react";
import { Link} from 'react-router-dom';
import {connect} from "react-redux";

export const Actions = (props) => {
    return (
     
        <div className="actions-section">
        <div className="content-container">
        <div className="actions-section__wrapper">
        
        <div className="actions-section__item">
            <Link className="actions-section__link" to="/create">
            <div className="actions-section__background">
            <img className="actions-section__img" src="images/popcorn.png"></img> 
            </div>
            <h3 className="actions-section__text">{props.language === "English" ? "Add a movie": "המלץ על סרט"}</h3>
            
            </Link>
        </div>
        <div className="actions-section__item">
            <Link className="actions-section__link" to="/friends">
            <div className="actions-section__background">
            <img className="actions-section__img" src="images/familyguy.png"></img>  
            </div>
            <h3 className="actions-section__text">{props.language === "English" ? "Message a friend": "שלח הודעה לחבר"}</h3>
           
            </Link>
        </div>
        <div className="actions-section__item">
            <Link className="actions-section__link" to="/contact">
            <div className="actions-section__background">
            <img className="actions-section__img" src="images/envelop.png"></img>  
            </div>
            <h3 className="actions-section__text">{props.language === "English" ? "Send feedback": "שלח פידבק על האפליקציה"}</h3>
            
            </Link>
        </div>
        </div>  
        </div>          
        </div>
     
    );
};

const mapStateToProps = (state) => ({
    language: state.auth.language
});

export default connect(mapStateToProps)(Actions);



