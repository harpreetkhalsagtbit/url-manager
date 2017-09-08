import React, { Component } from 'react';
// import logo from './logo.svg';
import { bindActionCreators } from 'redux'
import * as authActionCreator from './actions/AuthAction';
import * as urlMetadataActionCreator from './actions/UrlMetadataAction';
import * as urlMetadataPreviewActionCreator from './actions/UrlMetadataPreviewAction';
import {connect} from 'react-redux';

import './App.css';
import { history } from './store'
import Header from './components/common/Header/Header'
import Aside from './components/common/Aside/Aside'
import Main from './components/Main/Main'

var _changeInterval = null;
class App extends Component {
	constructor(props) {
	    super(props)

        this.state = {
            auth:Object.assign({}, this.props.auth),
        };

		this.logoutHandler = this.logoutHandler.bind(this);
		this.onChangeTextInput = this.onChangeTextInput.bind(this);
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

    render() {
        return (
            <div className="container">
                <Header logoutHandler={this.logoutHandler}></Header>
                <Aside></Aside>
                <Main></Main>
            </div>
        );
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
