import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
class App extends Component {
  render() {
    return(
        <React.Fragment>
          <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
              <Route exact path="/sign-in" component={Login}/>
            </Switch>
          </Router>
        </React.Fragment>
    );
  }
}

export default App;
