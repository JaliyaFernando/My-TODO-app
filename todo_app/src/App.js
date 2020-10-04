import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import TODOs from "./components/TODOs";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        const value= queryString.parse(window.location.search);
        this.getToken = this.getToken.bind(this);
        const code=value.code;
        const cookies = new Cookies();
        let token = cookies.get('token');
        this.state = {
            code: code,
            token: token
        }
    }
    componentDidMount() {
        if(!this.state.token){
            this.getToken();
        }
    }

    getToken(){
        if(this.state.code) {
            const userCode = {
                code: this.state.code
            }
            axios.post("http://localhost:8080/api/token", userCode)
                .then(res => {
                    if (res.data.token) {
                        let time = new Date();
                        time.setTime(time.getTime() + (60 * 60 * 1000));
                        const cookies = new Cookies();
                        cookies.set('token', res.data.token, {path: '/', expires: time});

                        axios.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token="+res.data.token.access_token)
                            .then(response => {
                                if (response.data) {
                                    let time = new Date();
                                    time.setTime(time.getTime() + (60 * 60 * 1000));
                                    const cookies = new Cookies();
                                    cookies.set('user', response.data, {path: '/', expires: time});
                                    this.setState({
                                        token: res.data.token
                                    });
                                }
                            });
                    }
                });
        }
    }
  render() {
    return(
        <React.Fragment>
            {
                (this.state.token) ?
                    ((window.location.pathname === '/sign-in') ? (window.location.href = 'http://localhost:3000/todos'): null) : //true
                    ((window.location.pathname !== '/sign-in') ? (window.location.pathname = '/sign-in') : null) //false
            }
            {
                (window.location.pathname !== '/sign-in') ? (
                    <NavigationBar/>
                ) : null
            }
          <Router>
            <Switch>
                <Route exact path="/sign-in" component={Login}/>
                <Route exact path="/todos" component={TODOs}/>
            </Switch>
          </Router>
            {
                (window.location.pathname !== '/sign-in') ? (
                    <Footer/>
                ) : null
            }
        </React.Fragment>
    );
  }
}

export default App;
