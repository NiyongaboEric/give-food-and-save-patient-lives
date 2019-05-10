import React, { Component } from 'react';

class Register extends Component{
    render() {
        return (
            <div className="Register">
                <h2 className="title">user registration form </h2>
                <div className="registerForm">
                    <form method="post" action="#">
                        <div className="regfullName">
                            <input type="text" name="fullName" placeholder="full name"/>
                            <br/>
                        </div>
                        <div className="regTel">
                            <input type="tel" name="contact" placeholder="telephone"/>
                            <br/>
                        </div>
                        <div className="regEmail">
                            <input type="email" name="email" placeholder="email"/>
                            <br/>                            
                        </div>
                        <div className="regPassword">
                            <input type="password" name="password" placeholder="password"/>
                            <br/>                            
                        </div>
                        <div className="regConfirmPassword">
                            <input type="password" name="confirmPasswrod" placeholder="confirm passsword"/>
                            <br/>
                        </div>
                        <div className="regCheckbox">
                            <input type="checkbox" name="checkbox"/>
                            <br/>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Register;