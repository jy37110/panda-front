import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userLogin: false,
        };
        this.userId = null;
        this.password = null;
    }
    handleLoginBtnClick = () => {
        if(this.userId === null || this.password === null){
            alert("Please enter both ID and Password!");
        } else {
            this.userLoginAsync().then(data =>{
                console.log(data);
            });
            //console.log(p);
        }
    };
    handlePasswordChange = (e) =>{
        this.password = e.target.value;
    };
    handleUserIdChange = (e)  => {
        this.userId = e.target.value;
    };
    userLoginAsync = async () => {
        const response = await fetch('https://ql0nzrabe5.execute-api.us-west-2.amazonaws.com/beta/auth',{
            method: 'POST',
            //mode: 'no-cors',
            body: {
                "Action": "Login",
                "Data": {
                    "Id": this.userId,
                    "Password": this.password
                }
            },
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    };
    render() {
        return (
            <div className="login-container">
                <Form className="login-form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter ID" onChange={this.handleUserIdChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                    </Form.Group>
                    <Button className="login-btn" variant="primary" type="button" onClick={this.handleLoginBtnClick}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}