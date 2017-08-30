import React, { Component } from 'react';
import logo from './logo.svg';
import { bindActionCreators } from 'redux'
import * as authActionCreator from './actions/AuthAction';
import * as urlMetadataActionCreator from './actions/UrlMetadataAction';
import * as urlMetadataPreviewActionCreator from './actions/UrlMetadataPreviewAction';
import {connect} from 'react-redux';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { history } from './store'
import Header from './components/common/Header/Header'
import { Button } from 'semantic-ui-react'
import ListItem from './components/common/ListItem/ListItem'
import URLPreview from './components/common/URLPreview/URLPreview'
import AddUrlShort from './components/url/AddUrlShort';
import FlexView from 'react-flexview';

// import store from './store'

var _changeInterval = null;
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth:Object.assign({}, this.props.auth),
            urlMetadata:[],
            urlMetadataPreview:{},
            urlForm: {},
            urlIdToEdit:"",
            isRequested:this.props.isRequested || false
        };
        this.logoutHandler = this.logoutHandler.bind(this);
        this.onChangeTextInput = this.onChangeTextInput.bind(this);
        this.saveURLHandler = this.saveURLHandler.bind(this);
        this.editURLHandler = this.editURLHandler.bind(this);
        this.deleteURLHandler = this.deleteURLHandler.bind(this);
        this.showEditModalHandler = this.showEditModalHandler.bind(this);
        this.showAddUrlPage = this.showAddUrlPage.bind(this);
        this.onKeyUpAddShortUrlTextInput = this.onKeyUpAddShortUrlTextInput.bind(this);
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


    onKeyUpAddShortUrlTextInput(event) {
        let _this = this;
        // wait untill user type in something
        // Don't let call setInterval - clear it, user is still typing
        clearInterval(_changeInterval)
        _changeInterval = setInterval(function() {
            var regExUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
            if(regExUrl.test(_this.state.urlForm.url)) {
                console.log("ajax")
                _this.props.urlMetadataPreviewAction.previewURL(_this.state.urlForm)
            } else {
                _this.setState({
                    urlMetadataPreview:{}
                })
            }
            // Typing finished, now you can Do whatever after 2 sec
            clearInterval(_changeInterval)
        }, 1000);
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

        if(nextProps.urlMetadataPreview) {
            console.log("here")
            this.setState({urlMetadataPreview:nextProps.urlMetadataPreview})
        }
    }

    logoutHandler () {
        this.props.authAction.logout()
    }
    editURLHandler (id) {
        console.log("editURLHandler", id)
        this.setState({
            urlIdToEdit:""
        })
        this.props.urlMetadataAction.editURL({
            id:this.state.urlIdToEdit,
            url:this.state.urlForm.url
        })
    }
    saveURLHandler () {
        this.props.urlMetadataAction.saveURL(this.state.urlForm)
        this.setState({
            urlForm:{
                "url":""
            }
        })
    }
    deleteURLHandler (id) {
        this.props.urlMetadataAction.removeURL(id)
    }
    showEditModalHandler (urlForm) {
        this.setState({
            urlIdToEdit:urlForm._id,
            urlForm:{
                "url":urlForm.metadata.url
            }
        })
    }
    showAddUrlPage() {
        history.push('/add-url')
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidUpdate() {
        console.log("didUpdate", this.props)
    }

    render() {
        // let urlPreview = "";
        console.log("before  if", this.state.urlMetadataPreview)
        if(Object.keys(this.state.urlMetadataPreview).length) {
            console.log("if", urlPreview)
        }
        let urlPreview = <URLPreview urlMetadataPreview={this.state.urlMetadataPreview.url || {}}></URLPreview>
        let listItem = <ListItem listdata={this.state.urlMetadata} showEditModalHandler={this.showEditModalHandler} deleteURLHandler={this.deleteURLHandler}></ListItem>
        let show = !Object.keys(this.state.urlMetadataPreview).length?listItem:urlPreview
        return (
            <div>
                <Header logoutHandler={this.logoutHandler}></Header>
                <AddUrlShort saveURLHandler={this.saveURLHandler} onChange={this.onChangeTextInput} onKeyUpAddShortUrlTextInput={this.onKeyUpAddShortUrlTextInput} urlShortForm={this.state.urlForm}/>
                {show}
            </div>
        );

        // <div className="main">
        //     <Header logoutHandler={this.logoutHandler}></Header>
        //     <AddUrlShort saveURLHandler={this.saveURLHandler} onChange={this.onChangeTextInput} urlShortForm={this.state.urlForm}/>
        //     <FlexView style={{backgroundColor: '#1A91EB'}}>
        //         <FlexView hAlignContent='center' marginTop='15px' marginBottom='15px' marginLeft='auto' marginRight='auto'>
        //             <ListItem listdata={this.state.urlMetadata} showEditModalHandler={this.showEditModalHandler} deleteURLHandler={this.deleteURLHandler}></ListItem>
        //         </FlexView>
        //     </FlexView>
        // </div>




                // <FlexView hAlignContent='right' marginBottom='15px' style={{backgroundColor: '#1A91EB'}}>
                //     <FlexView marginBottom='15px' marginRight='15px'>
                //         <Button negative circular icon='plus' onClick={this.showAddUrlPage}></Button>
                //     </FlexView>
                // </FlexView>
                // <AddUrlModal saveURLHandler={this.saveURLHandler} urlForm={this.state.urlForm} onChange={this.onChangeTextInput}></AddUrlModal>
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
        urlMetadata:state.urlMetadata,
        urlMetadataPreview:state.urlMetadataPreview
    };
}

function mapDispatchToProps(dispatch) {
    // console.log("mapDispatchToProps")
    return {
        authAction: bindActionCreators(Object.assign({}, authActionCreator), dispatch),
        urlMetadataAction: bindActionCreators(Object.assign({}, urlMetadataActionCreator), dispatch),
        urlMetadataPreviewAction: bindActionCreators(Object.assign({}, urlMetadataPreviewActionCreator), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
