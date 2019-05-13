import React, { Component } from 'react';

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            fullName: '',
            contact: '',
            email: '',
            password: '',
            confirmPassword: '',
            checkbox: false,
            validate: ''
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {     
        event.preventDefault();

        fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'            
            },
            body: JSON.stringify({
                fullName: this.state.fullName,
                contact: this.state.contact,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                checkbox: this.state.checkbox
            })
        })
        .then(data => data.json())
        .then(res => {
            this.setState({ validate: res.data })
        })
        .catch(err => this.setState({ validate: "API is dead" }))
    }

    render() {
        return (
            <div className="Register">
                <h2 className="title">user registration form </h2>
                <div className="registerForm">
                    <form  method="POST" onSubmit={this.handleSubmit}>
                        <div className="regfullName">
                            <input type="text" name="fullName" value={this.state.fullName} onChange={this.handleChange} placeholder="full name"/>
                            <br/>
                        </div>
                        <div className="regTel">
                            <input type="number" name="contact" value={this.state.contact} onChange={this.handleChange} placeholder="telephone"/>
                            <br/>
                        </div>
                        <div className="regEmail">
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="email"/>
                            <br/>
                        </div>
                        <div className="regPassword">
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/>
                            <br/>                            
                        </div>
                        <div className="regConfirmPassword">
                            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="confirm passsword"/>
                            <br/>
                        </div>
                        <div className="regCheckbox">
                            <input type="checkbox" name="checkbox" value={this.state.checkbox} onChange={this.handleChange}/>
                            <br/>
                        </div>
                        <button type="submit">Register</button>
                        <br/>
                        <span name="regMessage">{this.state.validate}</span>
                    </form>
                </div>
            </div>
        );
    }
}
export default Register;