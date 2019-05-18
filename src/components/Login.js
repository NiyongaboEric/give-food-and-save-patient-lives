import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email : '',
            password : '',
            message: ''
        });
        this.handlingInput = this.handlingInput.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
    handlingInput(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    loginSubmit(event) {
        event.preventDefault();
  
        const data = {
            email: this.state.email,
            password: this.state.password  
        }
        const headers = {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        }
        axios.post('http://localhost:5000/users/login', data, headers)
        .then(res => {
            window.localStorage.setItem('token', res.data.token);
            return this.setState({ message: res.data.data });
        })
        .catch(err => {
            return this.setState({ message: err.response.data.data });
        })
    }

    render() {     
        return (
            <div className="Login">
                <h2 className="title">Welcome to save lives platform</h2>
                <div className="loginForm">
                    <form method="POST"  onSubmit={this.loginSubmit}>
                        <div className="loginEmail">
                            <input type="email" name="email" value={this.state.email} onChange={this.handlingInput} placeholder="enter email"></input>
                            <br></br>
                        </div>
                        <div className="loginPassword">
                            <input type="password" name="password" value={this.state.password} onChange={this.handlingInput} placeholder ="enter password"></input>
                            <br></br>
                        </div>
                        <div className="loginButton">
                            <button type="submit">login</button>
                        </div>
                        <span>{this.state.message}</span>
                    </form>
                    <div className="advert"></div>
                </div>
            </div>
        );
    }
}
export default Login;