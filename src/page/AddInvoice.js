import React , { Component } from 'react';
import { connect } from "react-redux";
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AddInvoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            name: null,
            category: null,
            totalAmount: null,
            duration: "Weekly",
            hasError: false,
            errorMessage: null,
            hasSuccess: false,
            successMessage: null,
        };
        this.form = {};
    }

    handleSubmitBtnClick = () => {
        try{
            this.validation();
        }catch (e) {
            this.setState({hasError: true, errorMessage: e.toString()});
            return;
        }
        let amountByDay;
        switch(this.state.duration){
            case "Weekly":
                amountByDay = Number(this.state.totalAmount) / 7;
                break;
            case "Monthly":
                amountByDay = Number(this.state.totalAmount) / 30;
                break;
            case "Annually":
                amountByDay = Number( this.state.totalAmount) / 365;
                break;
            default:
                amountByDay = 0;
        }
        let form = {
            Action: "Create Invoice",
            Token: this.props.userState.token,
            Data: {
                amountByDay: amountByDay,
                category: this.state.category,
                duration: this.state.duration,
                happenedAt: this.state.startDate.toLocaleDateString(),
                name: this.state.name,
                totalAmount: this.state.totalAmount
            }
        };
        this.submitForm(form).then(response => {
            if(response.IsSuccess){
                this.setState({
                    hasSuccess: true,
                    successMessage: "Your record has been added successfully",
                });
            } else {
                this.setState({
                    hasError: true,
                    errorMessage: response.ErrorMessage,
                });
            }
        });
    };

    submitForm = async (form) => {
        const response = await fetch('https://ql0nzrabe5.execute-api.us-west-2.amazonaws.com/beta/invoice',{
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    };

    validation = () => {
        if(this.state.name === null) throw new Error("Record Name is Required");
        if(this.state.category === null) throw new Error("Category is Required");
        if(this.state.totalAmount === null || isNaN(this.state.totalAmount)) throw new Error("The value of Total Amount must be a Number");
        if(Number(this.state.totalAmount) <= 0) throw new Error("The value of Total Amount must be greater than 0");
        if(this.state.duration === null) throw new Error("Type is Required");
        if(this.state.startDate === null) throw new Error("Invalid date");
        if(this.props.userState.token === null || this.props.userState.token === undefined) throw new Error("Invalid User token, please login");
    };

    handleDateChange = (date) => {
        this.setState({startDate: new Date(date)});
    };

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    handleCategoryChange = (e) => {
        this.setState({category: e.target.value});
    };

    handleTotalAmountChange = (e) => {
        this.setState({totalAmount: e.target.value});
    };

    handleDurationChange = (e) => {
        this.setState({duration: e.target.value});
    };

    handleXBtnClick = () => {
        this.props.history.goBack();
    };

    render() {
        return (
                <Container className="add-invoice-container">
                    <Row className="justify-content-end">
                        <Button variant="secondary" onClick={this.handleXBtnClick}>X</Button>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={12} md={10} sm={8}>
                            <h3 className="add-invoice-title"> Adding New Record</h3>
                            <Form className="add-invoice-form">
                                <Form.Group controlId="formItemName">
                                    <Form.Label>Record Name</Form.Label>
                                    <Form.Control type="text" placeholder="Item Name" onChange={this.handleNameChange} />
                                </Form.Group>

                                <Form.Group controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Category" onChange={this.handleCategoryChange}/>
                                </Form.Group>

                                <Form.Group controlId="formTotalAmount">
                                    <Form.Label>Total Amount</Form.Label>
                                    <Form.Control type="text" placeholder="TotalAmount" onChange={this.handleTotalAmountChange} />
                                </Form.Group>

                                <Form.Group controlId="formDuration">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" onChange={this.handleDurationChange}>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Annually</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formHappenedAt">
                                    <Form.Label>Happened Date</Form.Label>
                                    <DatePicker
                                        placeholderText="Date"
                                        className="date-picker form-control"
                                        id="example-datepicker"
                                        value={this.state.startDate}
                                        selected={this.state.startDate}
                                        onChange={this.handleDateChange} />
                                </Form.Group>

                                {this.state.hasError ?
                                    <Alert variant="danger" onClose={() => this.setState({hasError: false, errorMessage: null})} dismissible>
                                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                        <p>
                                            {this.state.errorMessage}
                                        </p>
                                    </Alert> : null}

                                {this.state.hasSuccess ?
                                    <Alert variant="success">
                                        <Alert.Heading>Congratulations!</Alert.Heading>
                                        <p>
                                            {this.state.successMessage}
                                        </p>
                                        <hr />
                                        <div className="d-flex justify-content-end">
                                            <Button onClick={() => this.setState({hasSuccess: false, successMessage: null})} variant="outline-success">
                                                Got it!
                                            </Button>
                                        </div>
                                    </Alert>
                                    : null
                                }
                                <Button className="add-record-submit-btn" variant="outline-primary" type="button" onClick={this.handleSubmitBtnClick}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        );
    }
}

const mapStateToProps = state => {
    return state
};
export default connect (mapStateToProps)(AddInvoice)

