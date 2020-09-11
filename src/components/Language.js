import React from 'react';
import {connect} from "react-redux";
import {startAddLanguage} from "../actions/auth";

export class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: "English"
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        return this.props.startAddLanguage(this.state.language).then(() => {
            this.props.history.push("./");
        });
        
    };
    onCheck = (event) => {
        const language = event.currentTarget.value;
        this.setState({language});
    };
    render() {
        return (
            <div className="box-layout">
           <div className="box-layout__bg"></div>
           <div className="box-layout__signup-box">
           <form >
            <h2 className="signup__subtitle">Please choose a language:</h2>
            <h2 className="signup__subtitle">:בבקשה בחרו שפה</h2>
            
            <input 
                id="English"
                 name="language-selection"
                 onChange={this.onCheck} 
                 value={"English"}
                 type="radio"
                 checked
                 >
            </input>
            <label  htmlFor={"English"}>English</label>
            <br/>
            <input 
                 id="Hebrew"
                 name="language-selection"
                 onChange={this.onCheck} 
                 value="עברית"
                 type="radio">
            </input>
            <label htmlFor={"Hebrew"}>עברית</label>
                <br/>
                <button className="button button--signup"type="submit" onClick={this.onSubmit} >OK</button>
                
            </form> 
           </div>
           
        </div>
        );     
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddLanguage: (language) => dispatch(startAddLanguage(language)),
});

export default connect(undefined, mapDispatchToProps)(Language);
