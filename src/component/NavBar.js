import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    handleSignInBtnClicked = () => {
        window.location = 'login';
    };

    handleSignOutBtnClicked = () => {

    };

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <Button variant="outline-info" onClick={this.props.userState.login ? this.handleSignOutBtnClicked : this.handleSignInBtnClicked}>
                        {this.props.userState.login ? "SIGN OUT" : "SIGN IN"}</Button>
                </Form>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect (mapStateToProps)(NavBar);