import React from 'react';
import {connect} from "react-redux";
import {startEmailLogin, sendAuthenticationEmail} from "../actions/auth";


export class EmailLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password:"",
            error:"",
            forgotPassword: false,
            emailSent: false
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.startEmailLogin(
            {
                email:this.state.email, 
                password: this.state.password, 
                setError: this.setError, 
                setForgotPassword:this.setForgotPassword,
                setEmailSent: this.setEmailSent
            });
    };

    onEmailChange = (event) => {
        const email = event.target.value;
        this.setState({...this.state,forgotPassword:false, error:"", emailSent:false, email});
    };
    onPasswordChange = (event) => {
        const password = event.target.value;
        this.setState({...this.state, password});
    };
    setError = (error) => {
        this.setState({...this.state, error});
    }
    setForgotPassword = (bool) => {
        this.setState({...this.state, forgotPassword: bool});
    }
    setEmailSent = (bool) => {
        this.setState({...this.state, emailSent: bool})
    }

    onForgotPassword = () => {
        this.props.sendAuthenticationEmail(this.state.email);
        this.setState({...this.state, forgotPassword:false, error: "", emailSent: true});    
    }
   
    render() {
        return (
            <div className="box-layout">
           <div className="box-layout__bg"></div>
           <div className="box-layout__login-with-email-box">
           <form onSubmit={this.onSubmit}>
            <h2 className="signup__subtitle">Please insert email and password - If it's your first time simply choose a password: נא להכניס אימייל וסיסמא, אם זו הפעם הראשונה ניתן לבחור סיסמא</h2>
            
            <input className="text-input text-input--sign-in-with-email"
                type="email"
                placeholder="email"
                autoFocus={true}
                value = {this.state.email}
                onChange= {this.onEmailChange}
                required
            />
            <input className="text-input text-input--sign-in-with-email"
                type="password"
                placeholder="password"
                value = {this.state.password}
                onChange= {this.onPasswordChange}
                required
            />
               <div className="box-layout__error-div">{this.state.error && <p>{this.state.error}</p>}</div>
               {this.state.forgotPassword && <a onClick={this.onForgotPassword}>
               <p className="email-login__forgot-password">Forgot Password שכחתי סיסמא</p>
               </a>}
               {this.state.emailSent && <p>Email was sent to {this.state.email}</p>}
                <button className="button button--signup" type="submit" >Let's Go</button>
            </form> 
           </div>
        </div>
        );     
    };
};


const mapDispatchToProps = (dispatch) => ({
    startEmailLogin: (data) => dispatch(startEmailLogin(data)),
    sendAuthenticationEmail: (email) => dispatch(sendAuthenticationEmail(email))
});

export default connect(undefined, mapDispatchToProps)(EmailLogin);


  