import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    handleSignInBtnClicked = () => {
        this.props.history.push('/login');
    };

    handleSignOutBtnClicked = () => {
        this.props.dispatch({type: 'user logout'});
        this.props.history.push('/login');
    };

    handleTestBtnClicked = () => {
        console.log(this.props);
    };

    render() {
        return (
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={this.props.userState.login ? "/Dashboard" : "/login"}>Dashboard</Nav.Link>
                        <Nav.Link href={this.props.userState.login ? "/Editor" : "/login"}>Editor</Nav.Link>
                        <NavDropdown title="Statistic" id="basic-nav-dropdown">
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
                        <Button variant="outline-info" onClick={this.handleTestBtnClicked}>Test</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return state;
};
const NavBarWithRouter = withRouter(NavBar);
export default connect (mapStateToProps)(NavBarWithRouter);