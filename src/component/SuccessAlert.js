import React, {Component} from 'react';
import {Alert, Button} from "react-bootstrap";

export default class SuccessAlert extends Component{

    render() {
        return (
            <Alert variant="success">
                <Alert.Heading>Congratulations!</Alert.Heading>
                <p>
                    {this.props.successMessage}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.props.handleAction} variant="outline-success">
                        Got it!
                    </Button>
                </div>
            </Alert>
        );
    }
}