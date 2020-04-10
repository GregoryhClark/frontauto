import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        
    }
    
    attemptLogin=()=>{
        this.props.history.push('/dashboard')
    }
    render() {
        return (
            <div>
                <input placeholder="Email"/>
                <input placeholder="Password"/>
                <button onClick={this.attemptLogin}>Login</button>
            </div>
        );
    }
}

export default withRouter(Login);