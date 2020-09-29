import React,{Component} from 'react';
import '../App.css';
import axios from 'axios';
import {Button} from "react-bootstrap";
import logo from "../images/logo.png";

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        axios.get("http://localhost:8080/api/login")
            .then(
                (response) => {
                    console.log(response.data.AuthUrl);
                    window.location.href = response.data.AuthUrl;;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    render() {
        return (
            <div className="login" id="login">
                <div  className="loginForm">
                    <div align="center">
                        <img src={logo} alt="logo"/>
                        <h4>My TODO</h4>
                    </div>
                    <div align="center">
                        <Button variant="primary" type="submit" onClick={this.onSubmit}>
                            <span>Google Sign-in</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}