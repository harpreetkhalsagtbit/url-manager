import React, { Component } from 'react';
import { history } from './store'
import logo from './logo.svg';
import { Route } from 'react-router-dom'
import SignIn from './AuthComponents/SignIn';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated : false
        }
    }
    componentWillMount() {
        var token = localStorage.getItem("token")
        if(!token) {
            console.log("redirect to login")
            history.push("sign-in")
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <main>
                  <Route exact path="/sign-in" component={SignIn} />
                </main>

            </div>
        );
    }
}

export default App;
