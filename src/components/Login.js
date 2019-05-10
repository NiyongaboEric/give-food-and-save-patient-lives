import React, { Component } from 'react';

class Login extends Component {

    render() {     
        return (
            <div className="Login">
                <h2 className="title">Welcome to save lives platform</h2>
                <div className="loginForm">
                    <form action="#" method="post">
                        <div className="loginEmail">
                            <input type="email" name="email" placeholder="enter email"></input>
                            <br></br>
                        </div>
                        <div className="loginPassword">
                            <input type="password" name="password" placeholder ="enter password"></input>
                            <br></br>
                        </div>
                        <div className="loginButton">
                            <button type="submit">login</button>
                        </div>
                    </form>
                    <div className="advert"></div>
                </div>
            </div>
        );
    }
}
export default Login;