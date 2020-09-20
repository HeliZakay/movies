import React from "react";
import {connect} from "react-redux";
import {startAddFeedback} from "../actions/feedback";

export class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",     
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.startAddFeedback(this.state.content);
        this.props.history.push("/homepage");
    }
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({content}));
    }
    render() {
        return (
            <div className={String(this.props.language !== "English" && "align-right")}>
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
                          onChange={this.onContentChange}
                          value={this.state.content}
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
        </div>
        );
    };
}

const mapStateToProps = (state) => ({
    language: state.auth.language
});
const mapDispatchToProps = (dispatch) => ({
    startAddFeedback: (feedback) => dispatch(startAddFeedback(feedback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);


  
