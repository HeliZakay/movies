import React from "react";
import { Link} from 'react-router-dom';

export default () => {
    return (
        <div className="actions-section">
        <div className="content-container">
        <div className="actions-section__wrapper">
        
        <div className="actions-section__item">
            <Link className="actions-section__link" to="/create">
            <div className="actions-section__background">
            <img className="actions-section__img" src="images/popcorn.png"></img> 
            </div>
            <h3 className="actions-section__text">Add a movie</h3>
            
            </Link>
        </div>
        <div className="actions-section__item">
            <Link className="actions-section__link" to="/friends">
            <div className="actions-section__background">
            <img className="actions-section__img" src="images/familyguy.png"></img>  
            </div>
            <h3 className="actions-section__text">Add a friend</h3>
           
            </Link>
        </div>
        <div className="actions-section__item">
            <Link className="actions-section__link" to="/contact">
            <div className="actions-section__background">
            <img className="actions-section__img" src="images/envelop.png"></img>  
            </div>
            <h3 className="actions-section__text">Send feedback</h3>
            
            </Link>
        </div>
        </div>  
        </div>          
        </div>
    );
};



