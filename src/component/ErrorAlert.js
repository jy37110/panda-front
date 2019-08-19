import React, {Component} from 'react';
import { Alert } from "react-bootstrap";

export default class ErrorAlert extends Component{

    render() {
        return (
            <Alert variant="danger" onClose={this.props.handleAction} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {this.props.errorMessage}
                </p>
            </Alert>
        );
    }
}