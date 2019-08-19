import React, {Component} from 'react';
import {connect} from "react-redux";
import InvoiceTable from "../component/InvoiceTable";
import { Button } from 'react-bootstrap';

class Editor extends Component{
    constructor(props){
        super(props);
        this.state = {
            userLogin: false
        };
        this.loadInvoicesFromServer().then(response => {
            this.invoices = this.AWSDataMapper(response);
            this.props.dispatch({type: 'sync invoice', invoices: this.invoices});
        });
    }

    AWSDataMapper = (response) => {
        if(!response.IsSuccess) return [];
        else {
            return response.Data.map(item => {
                return {
                    name: item.name.S,
                    category: item.category.S,
                    duration: item.duration.S,
                    totalAmount: Number(item.total_amount.N),
                    happenedAt: new Date(item.happened_at.S),
                    amountByDay: Number(item.amount_by_day.N),
                    invoiceId: item.invoice_id.S
                }
            }).sort((a, b) => {
                return a.happenedAt > b.happenedAt ? 1 : ((b.happenedAt > a.happenedAt) ? -1 : 0);
            });
        }
    };

    loadInvoicesFromServer = async () => {
        const response = await fetch('https://ql0nzrabe5.execute-api.us-west-2.amazonaws.com/beta/invoice',{
            method: 'POST',
            body: JSON.stringify({
                Action: "Get Invoices",
                Token: this.props.userState.token,
                Data: {
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
            <div>
                <InvoiceTable/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

export default connect (mapStateToProps)(Editor)