import React , { Component } from 'react';

export default class Editor extends Component{
    constructor(props){
        super(props);
        this.state = {
            userLogin: false
        }
    }
    render() {
        return (
            <div>
                <h1>This is Editor</h1>
            </div>
        );
    }
}