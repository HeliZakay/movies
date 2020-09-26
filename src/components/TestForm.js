import React from "react";
import {startSetEmails} from "../actions/messages";
import {connect} from "react-redux";
import emailjs from 'emailjs-com';

export class TestForm extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            arrayOfUnreadMessages: []       
        }
    }
    onSendEmails = () => {
            let num = 28;
            let template = this.props.emails[num].language === 1? 'template_gbh6uqj': 'template_edjw6nw'
            emailjs.send(
                'gmail',
                 template, 
                 {
                     to_name : this.props.emails[num].to_name,
                     unread_count :this.props.emails[num].unread_count,
                     to_email: this.props.emails[num].to_email,
                     reply_to: "helizakay2@gmail.com"
                },
                process.env.EMAIL_JS_API_KEY 
                 
            ).then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }  
        
        // this.props.emails.forEach((email) => {
        //     emailjs.send('gmail', 'template_gbh6uqj', {to_name : email.to_name, unread_count : email.unread_count}, 'user_bWdbYEhvHn6yEnNskX3WS')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });      
        // });
    
    setArrayOfUnreadMessages = (arrayOfUnreadMessages) => {
        this.setState({
            arrayOfUnreadMessages 
        });
    }
    onClick = () => {
        this.props.startSetEmails();
    }
   
    render() {
        return ( <div>
            <button className="button" onClick={this.onClick}>Get Unread messages Info</button>
            <button className="button" onClick={this.onSendEmails}>Send Emails to emails in store</button>
        </div>);           
        }
    }
const mapStateToProps = (state) => ({
    emails: state.messages.emails
})
const mapDispatchToProps = (dispatch) => ({
    startSetEmails: ()=> dispatch(startSetEmails())
});
export default connect(mapStateToProps,mapDispatchToProps)(TestForm);