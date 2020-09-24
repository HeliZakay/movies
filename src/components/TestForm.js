import React from "react";
import emailjs from 'emailjs-com';

export default class TestForm extends React.Component {
    
    
    
    // sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm('gmail', 'template_sa17p96', e.target, '')
    //       .then((result) => {
    //           console.log(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //       });
    //       e.target.reset();
    // }
    render() {
        return (
        <form onSubmit={this.sendEmail}>
            <input
            type="text"
            name="text"
            placeholder="text"/>
            <button className="button" type="submit" >Send</button>
        </form>
    );
        }
}