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
            action="/" 
            method="post" 
            encType="text/plain"
            // onSubmit={this.onSubmit}
            className="form" >

            <div className="page-header">
            <div className="content-container--form">
                 <h2 className="page-header__title">Send Feedback</h2>
            </div>
        </div>
        <div className="content-container--form">
           <p>
            The goal here is to make your experience as much pleasant as possible!
           </p>
           <textarea className="textarea text-area--contact"
                        placeholder="Write your feedback here"
                        name="feedback" autoFocus>
        </textarea>
        <div>
                <button type="submit" className="button button--form"><strong>Send!</strong></button>
        </div>
        </div>
        </form>

        );
    };
}

    
 export default connect()(Contact);
  
