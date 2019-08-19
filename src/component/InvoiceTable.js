import React , { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import {connect} from "react-redux";
import { withRouter } from 'react-router';

class InvoiceTable extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    handleAddBtnClick = () => {
        this.props.history.push('/add-invoice')
    };

    render() {
        return (
            <div className="invoice-table-container">
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
                                        <Button className="delete-btn" variant="outline-danger">Delete</Button>
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
