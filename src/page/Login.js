import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userLogin: false,
            displayErr: false,
            errorMessage: null,
        };
        this.userId = null;
        this.password = null;
    }
    handleLoginBtnClick = () => {
        if(this.userId === null || this.password === null){
            alert("Please enter both ID and Password!");
        } else {
            this.userLoginAsync().then(data =>{
                if(data.IsSuccess){
                    this.setState({displayErr: false, errorMessage: null});
                    this.props.dispatch({type: 'user login', token: data.Data});
                    this.props.history.push("/");
                } else {
                    this.setState({displayErr: true, errorMessage: data.ErrorMessage});
                }
            });
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
            body: JSON.stringify({
                Action: "Login",
                Data: {
                    Id: this.userId,
                    Password: this.password
                }
            }),
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
                    {this.state.displayErr ? <p className="login-err-msg">{this.state.errorMessage}</p> : null}
                    <Button className="login-btn" variant="primary" type="button" onClick={this.handleLoginBtnClick}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};
export default connect (mapStateToProps)(Login)