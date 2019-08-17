import React , { Component } from 'react';

export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            userLogin: false
        }
    }
    render() {
        return (
            <div>
                <h1>This is Dashboard</h1>
            </div>
        );
    }
}