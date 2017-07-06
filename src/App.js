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
import Modal from './components/common/Modal'
// import store from './store'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth:Object.assign({}, this.props.auth),
            urlMetadata:[],
            urlForm: {},
            open:false,
            isRequested:this.props.isRequested || false
        };
        this.logoutHandler = this.logoutHandler.bind(this);
        this.onChangeTextInput = this.onChangeTextInput.bind(this);
        this.saveURLHandler = this.saveURLHandler.bind(this);
        this.showModal = this.showModal.bind(this);
    }
    componentDidMount(a,b,c) {
        console.log("componentDidMount")
        // this.props.authAction.checkAuthStatus()
        // this.props.getAuth()
        if(this.props.auth && this.props.auth.isLoggedIn && this.props.urlMetadata.length) {
            this.setState({urlMetadata:this.props.urlMetadata})
        }
    }

    onChangeTextInput(event) {
        const field = event.target.name;
        let urlForm = this.state.urlForm;
        urlForm[field] = event.target.value;
        return this.setState({urlForm: urlForm});
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        if(nextProps.auth && !nextProps.auth.isLoggedIn && nextProps.history) {
            nextProps.history.push("/sign-in")
        } else if(nextProps.auth && nextProps.auth.isLoggedIn && nextProps.urlMetadata.length) {
            this.setState({urlMetadata:nextProps.urlMetadata})
        } else if(nextProps.auth && nextProps.auth.isLoggedIn && !this.state.isRequested){
            // this should have done with props
            // :(
            // I tried so many methods, but finally I have to
            // do it in this way using promises
            // and manually setting state
            this.props.urlMetadataAction.loadURLsWithMeta()
            this.setState({
                isRequested:true
            })
        }
    }

    logoutHandler () {
        localStorage.setItem("token","")
        this.props.history.push("/sign-in")
    }
    saveURLHandler () {
        this.setState({
            open:false
        })
        this.props.urlMetadataAction.saveURL(this.state.urlForm)
    }
    showModal() {
        this.setState({
            open:true
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidUpdate() {
        console.log("didUpdate")
    }

    render() {
        // console.log()
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome</h2>
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
                <Modal open={this.state.open}header='Add URL' saveURLHandler={this.saveURLHandler} urlForm={this.state.urlForm}onChange={this.onChangeTextInput}></Modal>
                <Button onClick={this.showModal}>Long Modal</Button>
            </div>
        );
    }
}

var count = 0;
function mapStateToProps(state, ownProps) {
    console.log(count++, "mapStateToProps", state)    
    return {
        auth:state.auth,
        urlMetadata:state.urlMetadata
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
