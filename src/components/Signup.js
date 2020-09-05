import React from 'react';
import {connect} from "react-redux";
import {startAddUsername, startLogout} from "../actions/auth";
const superheroes = require('superheroes');

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        return this.props.startAddUsername(this.state.username).then(() => {
            this.props.history.push("./");
        });
        
    };
    onUsernameChange = (event) => {
        const username = event.target.value;
        this.setState( () => ({username}));
    };
    onRandomizeNicknameClick = (event) => {
        event.preventDefault();
        const username = superheroes.random();
        this.setState( () => ({username}));
    };
    render() {
        return (
            <div>
            <br/>
            <br/>
            <form >
            <button onClick={this.props.startLogout}>Logout</button>
            <h3>It's your first time, choose a cool nickname</h3>
            <button onClick={this.onRandomizeNicknameClick}>Randomize a cool nickname</button>
            <input 
                type="text"
                placeholder="UserName"
                autoFocus={true}
                value = {this.state.username}
                onChange= {this.onUsernameChange}
                required
                onChange={this.onUsernameChange}
            />
                <button type="submit" onClick={this.onSubmit} >OK</button>
            </form> 
        </div>
        );     
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddUsername: (username) => dispatch(startAddUsername(username)),
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Signup);



  