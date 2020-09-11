import React from "react";
import {connect} from "react-redux";

export class Contact extends React.Component {
    onSubmit = (event) => {
        event.preventDefault();
        this.props.history.push("/homepage");
    }
    render() {
        return (
            <form
         
            encType="text/plain"
            onSubmit={this.onSubmit}
            className="form" >

            <div className="page-header">
            <div className="content-container--form">
                 <h2 className="page-header__title">
                 {this.props.language === "English"? 
                 "Send Feedback": "שלחו פידבק"
                 }
                 
                 </h2>
            </div>
        </div>
        <div className="content-container--form">
           <p>
           {this.props.language === "English"? 
                 "The goal here is to make your experience as much pleasant as possible!":
                  " המטרה שהחוויה שלכם באפליקציה תהיה נוחה ונעימה ככל האפשר , אנא שלחו פידבק כדי לעזור לשפר "
                 }
            
           </p>
           <textarea className="textarea text-area--contact"
                        placeholder=
                        {this.props.language === "English"? 
                        "Write your feedback here":
                        " כתבו פה את הפידבק "
                          }
                        name="feedback" autoFocus>
        </textarea>
        <div>
                <button type="submit" className="button button--form">
                <strong>
                {this.props.language === "English"? 
                        "Send!":
                  " שלחו! "
                 }
                
                </strong>
                </button>
        </div>
        </div>
        </form>

        );
    };
}

const mapStateToProps = (state) => ({
    language: state.auth.language
});

export default connect(mapStateToProps)(Contact);


  
