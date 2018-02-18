import React, { Component } from 'react';
// import logo from './logo.svg';
import { bindActionCreators } from 'redux'
import * as authActionCreator from '../../actions/AuthAction';
import * as urlMetadataActionCreator from '../../actions/UrlMetadataAction';
import * as urlMetadataPreviewActionCreator from '../../actions/UrlMetadataPreviewAction';
import {connect} from 'react-redux';

import ListItem from '../common/ListItem/ListItem'
import AddUrlPreview from '../Url/AddUrlPreviewModal/AddUrlPreviewModal'
import EditUrlModal from '../Url/EditUrlModal/EditUrlModal'
import AddUrl from '../Url/Add/Add'
import './Main.css';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
// const Main = ({listdata = [], urlMetadataPreview={}, isPreviewUrlModalHidden, showEditModalHandler, onChangeTextInput, onKeyUpAddShortUrlTextInput, deleteURLHandler, label, onChange, placeHolder, value, error}) => {

var count=0;
var _changeInterval = null;
class Main extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	// auth:Object.assign({}, this.props.auth),
	    	urlForm: {},
	        isPreviewUrlModalHidden:true,
	        isEditUrlModalHidden:true,
			urlMetadata:[],
			urlMetadataPreview:{},
			metadataOfUrlToEdit:{}
	    };

		this.onChangeTextInput = this.onChangeTextInput.bind(this);
		this.onKeyUpAddShortUrlTextInput = this.onKeyUpAddShortUrlTextInput.bind(this);
		this.onChangeTextInput = this.onChangeTextInput.bind(this);
		this.onClickModalWrapper = this.onClickModalWrapper.bind(this);
		this.saveURLHandler = this.saveURLHandler.bind(this);
		this.removeURLHandler = this.removeURLHandler.bind(this);
		this.updateURLHandler = this.updateURLHandler.bind(this);

		this.showEditUrlModal = this.showEditUrlModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps", nextProps)
		if (nextProps.urlMetadata) {
			this.setState({
				urlMetadata: nextProps.urlMetadata,
			})
		}
		if (Object.keys(nextProps.urlMetadataPreview).length) {
			this.setState({
				urlMetadataPreview: nextProps.urlMetadataPreview,
				isPreviewUrlModalHidden: false
			})
		}
	}

	componentDidMount() {
		console.log(this.props, "did mount")
	}

	onChangeTextInput(event) {
		console.log("working")
	    const field = event.target.name;
	    let urlForm = this.state.urlForm;
	    urlForm[field] = event.target.value;
	    return this.setState({urlForm: urlForm});
	}

	onClickModalWrapper(event) {
		event.stopPropagation();
		let urlForm = this.state.urlForm;
		urlForm["url"] = "";
	    return this.setState({
	    	isPreviewUrlModalHidden: true,
	    	isEditUrlModalHidden: true,
	    	urlForm:urlForm,
		    urlMetadataPreview:{},
	    });
	}

	onKeyUpAddShortUrlTextInput(event) {
		let _this = this;
		count++

		// wait untill user type in something
		// Don't let call setInterval - clear it, user is still typing
		clearInterval(_changeInterval);
		_changeInterval = setInterval(function() {
			var regExUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
			if(regExUrl.test(_this.state.urlForm.url)) {
				console.log("ajax", _this.state.urlForm)
				_this.props.urlMetadataPreviewAction.previewURL(_this.state.urlForm)
			// } else {
			// 	triggerPreviewURL()
			}
			// Typing finished, now you can Do whatever after 2 sec
			clearInterval(_changeInterval)
		}, 1000);
	}

	saveURLHandler() {
		this.props.urlMetadataAction.saveURL(this.state.urlForm)
		this.props.urlMetadataPreviewAction.previewURLHide()

		this.setState({
			isPreviewUrlModalHidden: true,
		    urlMetadataPreview:{}
		})
	}

	updateURLHandler() {
		console.log(this.state)
		this.props.urlMetadataAction.editURL(this.state.metadataOfUrlToEdit)
		this.props.urlMetadataPreviewAction.previewURLHide()

		this.setState({
			isPreviewUrlModalHidden: true,
		    urlMetadataPreview:{}
		})
	}

	removeURLHandler(id) {
		this.props.urlMetadataAction.removeURL(id)
	}

	showEditUrlModal(metadataOfUrlToEdit) {
		this.setState({
			isEditUrlModalHidden: false,
			metadataOfUrlToEdit:metadataOfUrlToEdit
		})
	}

	render () {
		let _addUrlPreview="";

		return (
			<div className="page">
				<AddUrl name="url" value={this.state.urlForm.url} onChangeTextInput={this.onChangeTextInput} onKeyUpAddShortUrlTextInput={this.onKeyUpAddShortUrlTextInput}></AddUrl>
				<ListItem listdata={this.state.urlMetadata} showEditModalHandler={this.showEditUrlModal} deleteURLHandler={this.removeURLHandler}></ListItem>
				<AddUrlPreview hide={this.state.isPreviewUrlModalHidden} onClickModalWrapper={this.onClickModalWrapper} urlMetadataPreview={this.state.urlMetadataPreview} saveURLHandler={this.saveURLHandler}></AddUrlPreview>
				<EditUrlModal hide={this.state.isEditUrlModalHidden} onChangeTextInput={this.onChangeTextInput} onClickModalWrapper={this.onClickModalWrapper} urlMetadata={this.state.metadataOfUrlToEdit} updateURLHandler={this.updateURLHandler}></EditUrlModal>
			</div>
			
		);
	}
};
var count = 0;
function mapStateToProps(state, ownProps) {
    console.log(count++, "mapStateToProps main", state)
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

