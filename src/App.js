import React, { Component } from 'react';
import logo from './logo.svg';
import { bindActionCreators } from 'redux'
import * as authActionCreator from './actions/AuthAction';
import * as urlMetadataActionCreator from './actions/UrlMetadataAction';
import {connect} from 'react-redux';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react'
import ListItem from './components/common/ListItem'
// import store from './store'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth:Object.assign({}, this.props.auth),
            urlMetadata:[],
        };
        this.logoutHandler = this.logoutHandler.bind(this);
    }
    componentDidMount(a,b,c) {
        // console.log("componentDidMount", this.props)
        // this.props.authAction.checkAuthStatus()
        // this.props.getAuth()
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if(nextProps.auth && !nextProps.auth.isLoggedIn && nextProps.history) {
            nextProps.history.push("/sign-in")
        } else {
            // this should have done with props
            // :(
            // I tried so many methods, but finally I have to
            // do it in this way using promises
            // and manually setting state
            this.props.urlMetadataAction.loadURLsWithMeta().then((result) => {
                this.setState({
                    urlMetadata: result.data
                })
            })
        }
    }

    logoutHandler () {
        localStorage.setItem("token","")
        this.props.history.push("/sign-in")
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log("shouldComponentUpdate", nextProps, nextState)
        return true;
        // if(this.props.auth && this.props.auth.isLoggedIn) {
        //     this.setState({course: Object.assign({}, this.props.auth)});
        //     // this.props.history.push("/")
        // }
    }
    componentDidUpdate() {
        // console.log("didUpdate", this)
        // if(this.props.auth && this.props.auth.isLoggedIn) {
        //     this.setState({course: Object.assign({}, this.props.auth)});
        //     // this.props.history.push("/")
        // }
    }

    render() {
        // console.log()
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
                    <Button onClick={this.logoutHandler}>
                        Logout
                    </Button>
                </main>
                <ListItem listdata={this.state.urlMetadata}></ListItem>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     isLoggedIn: state.getLogInStatus.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
//     getLogInStatus,
//     redirectToLogin
//     // changePage: () => push('/about-us')
// }, dispatch)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App)

// var count = 0;
function mapStateToProps(state, ownProps) {
    // console.log(count++, "mapStateToProps", state, JSON.stringify(state.urlMetaData))
    // var urlMetaData = [];
    // if(state.urlMetaData) {
    //     console.log("if")
    //     urlMetaData = JSON.parse(state.urlMetaData.response.responseText)
    // } else {
    //     console.log("else", JSON.stringify(state.urlMetaData))
    // }
    
    return {
        auth:state.auth
        // urlMetaData:state.urlMetaData
    };
}

function mapDispatchToProps(dispatch) {
    // console.log("mapDispatchToProps")
    return {
        authAction: bindActionCreators(Object.assign({}, authActionCreator), dispatch),
        urlMetadataAction: bindActionCreators(Object.assign({}, urlMetadataActionCreator), dispatch)
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
