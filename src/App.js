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
import AddUrlModal from './components/url/AddUrlModal.js';
import FlexView from 'react-flexview';

// import store from './store'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth:Object.assign({}, this.props.auth),
            urlMetadata:[],
            urlForm: {},
            open:false,
            urlIdToEdit:"",
            isRequested:this.props.isRequested || false
        };
        this.logoutHandler = this.logoutHandler.bind(this);
        this.onChangeTextInput = this.onChangeTextInput.bind(this);
        this.saveURLHandler = this.saveURLHandler.bind(this);
        this.editURLHandler = this.editURLHandler.bind(this);
        this.deleteURLHandler = this.deleteURLHandler.bind(this);
        this.showEditModalHandler = this.showEditModalHandler.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount() {
        // this.props.authAction.checkAuthStatus()
        // this.props.getAuth()
        if(this.props.auth && this.props.auth.isLoggedIn && this.props.urlMetadata.length) {
            this.setState({urlMetadata:this.props.urlMetadata})
        } else if(this.props.auth.isLoggedIn && !this.state.isRequested) {
            this.props.urlMetadataAction.loadURLsWithMeta()
            this.setState({
                isRequested:true,
                isLoggedIn:this.props.auth.isLoggedIn
            })
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
                isRequested:true,
                isLoggedIn:nextProps.auth.isLoggedIn
            })
        } else {
            this.setState({urlMetadata:[]})
        }
    }

    logoutHandler () {
        this.props.authAction.logout()
    }
    editURLHandler (id) {
        console.log("editURLHandler", id)
        this.setState({
            urlIdToEdit:"",
            open:false
        })
        this.props.urlMetadataAction.editURL({
            id:this.state.urlIdToEdit,
            url:this.state.urlForm.url
        })
    }
    saveURLHandler () {
        this.setState({
            open:false
        })
        this.props.urlMetadataAction.saveURL(this.state.urlForm)
    }
    deleteURLHandler (id) {
        this.props.urlMetadataAction.removeURL(id)
    }
    showEditModalHandler (urlForm) {
        this.setState({
            open:true,
            urlIdToEdit:urlForm._id,
            urlForm:{
                "url":urlForm.metadata.url
            }
        })
    }
    showModal() {
        this.setState({
            open:true
        })
    }
    hideModal() {
        this.setState({
            open:false
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidUpdate() {
        console.log("didUpdate", this.props)
    }

    render() {
        return (
            <div className="main">
                <FlexView style={{height: 50, backgroundColor: '#D1236D'}}>
                    <FlexView  hAlignContent='center' marginTop='5px' marginBottom='5px' marginLeft='auto'>
                        <Button primary onClick={this.logoutHandler}>
                            Logout
                        </Button>
                    </FlexView>
                </FlexView>
                <FlexView style={{height: 10}}>
                </FlexView>
                <FlexView style={{backgroundColor: '#1A91EB'}}>
                    <FlexView hAlignContent='center' marginTop='15px' marginBottom='15px' marginLeft='auto' marginRight='auto'>
                        <ListItem listdata={this.state.urlMetadata} showEditModalHandler={this.showEditModalHandler} deleteURLHandler={this.deleteURLHandler}></ListItem>
                    </FlexView>
                </FlexView>
                <FlexView hAlignContent='right' marginBottom='15px' style={{backgroundColor: '#1A91EB'}}>
                    <FlexView marginBottom='15px' marginRight='15px'>
                        <Button negative circular icon='plus' onClick={this.showModal}></Button>
                    </FlexView>
                </FlexView>
                <AddUrlModal open={this.state.open} hideModal={this.hideModal} saveURLHandler={this.saveURLHandler} urlForm={this.state.urlForm} onChange={this.onChangeTextInput}></AddUrlModal>
            </div>
        );
            // <div className="App">
            //     <main>
            //     </main>
            //     <ListItem listdata={this.state.urlMetadata} showEditModalHandler={this.showEditModalHandler} deleteURLHandler={this.deleteURLHandler}></ListItem>
            // </div>
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
