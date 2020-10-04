import React,{Component} from 'react';
import '../App.css';
import axios from 'axios';
import {Button} from "react-bootstrap";
import logo from "../images/logo.png";
import googleIcon from "../images/google-icon.png";

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
                    window.location.href = response.data.AuthUrl;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    render() {
        return (
            <div className="login" id="login">
                <div className="loginForm">
                    <div align="center">
                        <img className="logo" src={logo} alt="logo"/>
                        <h2>My TODO</h2>
                    </div>
                    <div align="center">
                        <Button variant="primary" type="submit" onClick={this.onSubmit}>
                            <span><img className="googleImg" src={googleIcon} alt="Google" style={{float:'left'}}/>Sign-in using Google</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}