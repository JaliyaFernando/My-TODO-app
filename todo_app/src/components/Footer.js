import React,{Component} from 'react';
import {Container} from "react-bootstrap";

export default class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <Container align="center">
                    <p>Copyright 2020 &copy; J&J All Rights Reserved</p>
                </Container>
            </div>
        );
    }
}