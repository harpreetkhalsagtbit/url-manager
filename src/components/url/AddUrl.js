import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import * as authActionCreator from '../../actions/AuthAction';
import * as urlMetadataActionCreator from '../../actions/UrlMetadataAction';
import {connect} from 'react-redux';

import AddUrlForm from './AddUrlForm';
import FlexView from 'react-flexview';
import Header from '../common/Header/Header'


class AddUrl extends Component {

    constructor(props) {
        super(props)
        this.state = {
            check:"check",
            auth:Object.assign({}, this.props.auth),
            urlForm:{},
            errors:{}
        };

        // console.log("cSignUpuctor", this)
        this.updateAddUrlFormState = this.updateAddUrlFormState.bind(this);
        this.saveURLHandler = this.saveURLHandler.bind(this);
        this.cancelSaveURLHandler = this.cancelSaveURLHandler.bind(this);
    }
    componentWillMount() {
        // console.log("componentWillMount", this)
        // if(this.props.auth && !this.props.auth.isLoggedIn && this.props.history) {
        //     this.props.history.push("/sign-in")
        // }

    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps)
        if(nextProps.auth && nextProps.auth.signUpStatus) {
            nextProps.history.push("/sign-in")
        }
    }

    updateAddUrlFormState(event) {
        const field = event.target.name;
        let urlForm = this.state.urlForm;
        urlForm[field] = event.target.value;
        return this.setState({urlForm: urlForm});
    }

	saveURLHandler () {
		console.log(this.state.urlForm)
        this.props.urlMetadataAction.saveURL(this.state.urlForm)
        this.props.history.push("/")
    }
    cancelSaveURLHandler () {
        this.setState({urlForm: {}})
        this.props.history.push("/")
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
    logoutHandler () {
        this.props.authAction.logout()
    }

    render() {
        // console.log("render", status, this)
        var showError = null
        if(this.state.errors.errorCode === 400) {
            showError = "<h1>Error</h1>"
        }
        return (
        	<div>
        		<Header logoutHandler={this.logoutHandler}></Header>
        		<FlexView hAlignContent='left' style={{backgroundColor: '#1A91EB'}}>
                    <AddUrlForm
                        onChange = {this.updateAddUrlFormState}
                        saveURLHandler={this.saveURLHandler}
                        cancelSaveURLHandler={this.cancelSaveURLHandler}
                        formDetails={this.state.urlForm}
                        errors={this.state.errors}
                    />
                    {showError}
        		</FlexView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUrl);
