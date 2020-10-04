import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import {Button, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logo from "../images/logo.png";

export default class NavigationBar extends Component{
    constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get('user');
        super(props);
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.state = {
            user: user,
        }
    }
    onClickSignOut(e) {
        e.preventDefault();
        console.log("Signout");
        const cookies = new Cookies();
        cookies.remove('token');
        cookies.remove('user');
        window.location.href = "/sign-in";
    }

    render(){
        return (
            <div className="topNav" id="topNav">
                <hr className="navDivider"/>
                <Navbar expand="lg">
                    <Navbar.Brand href="/"  className="logo">
                        <img src={logo} alt="logo" align="center"/>
                        <h3>My TODO</h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="navigation">
                        <Nav className="ml-auto">
                            <NavDropdown className="userName" title={this.state.user.given_name +' '+ this.state.user.family_name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={this.onClickSignOut}>
                                        <div>
                                            <Button variant="primary" type="submit">
                                                <span>Sign-out</span>
                                            </Button>
                                        </div>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Brand href="/"  className="user">
                            <img src={this.state.user.picture} alt="user" align="center"/>
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
                <hr className="navDivider"/>
            </div>
        );
    }
}