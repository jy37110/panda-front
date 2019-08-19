import React , { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import ErrorAlert from '../component/ErrorAlert';
import SuccessAlert from '../component/SuccessAlert';

class InvoiceTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            errorMessage: null,
            hasSuccess: false,
            successMessage: null
        }
    }

    handleAddBtnClick = () => {
        this.props.history.push('/add-invoice')
    };

    handleDelBtnClick = (invoiceId) => {
        this.deleteItemFromServer(invoiceId).then(response => {
            if(response.hasOwnProperty('IsSuccess')){
                if(response.IsSuccess){
                    this.props.dispatch({type: 'delete invoice', invoiceId: invoiceId});
                    this.setState({hasSuccess: true, successMessage: "You have delete the record successfully"})
                } else {
                    throw new Error(response.ErrorMessage)
                }
            } else {
                throw new Error("No response from server");
            }
        }).catch(error => {
            this.setState({hasError: true, errorMessage: error.message});
        })
    };

    deleteItemFromServer = async (invoiceId) => {
        const response = await fetch('https://ql0nzrabe5.execute-api.us-west-2.amazonaws.com/beta/invoice',{
            method: 'DELETE',
            body: JSON.stringify({
                Action: "Delete Invoice",
                Token: this.props.userState.token,
                Data: {
                    invoiceId: invoiceId
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
            <div className="invoice-table-container">
                {this.state.hasError ? <ErrorAlert
                    errorMessage={this.state.errorMessage}
                    handleAction={() => {this.setState({hasError: false, errorMessage: null})}}
                /> : null}

                {this.state.hasSuccess ? <SuccessAlert
                    successMessage={this.state.successMessage}
                    handleAction={() => {this.setState({hasSuccess: false, successMessage: null})}}
                /> : null}

                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Type</th>
                        <th>Daily Amount</th>
                        <th>
                            Options
                            <Button className="add-btn" variant="outline-success" size="sm" onClick={this.handleAddBtnClick}>Add</Button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.invoiceState.invoices.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{new Date(item.happenedAt.toString()).toLocaleDateString()}</td>
                                    <td>{item.totalAmount}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.amountByDay}</td>
                                    <td>
                                        <Button className="delete-btn" variant="outline-danger" onClick={() => this.handleDelBtnClick(item.invoiceId)}>Del</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const InvoiceTableWithRouter = withRouter(InvoiceTable);
export default connect (mapStateToProps)(InvoiceTableWithRouter);
